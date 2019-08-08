import { DataService } from "../services/data.service";
import { observable, action } from "mobx";
import { Injectable } from "@angular/core";
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MappingService } from '../services/mapping.service';
import { recordStatus, crimeStatus, arrestObjStatus } from '../dummy/stauts';
@Injectable()
export class Person {
    @observable data = [];
    @observable images = [];
    @observable loading = false;
    @observable empty = false;
    @observable process = false;
    uploads: any[];
    allPercentage: Observable<any>;
    files: Observable<any>;
    constructor(
        private ds: DataService,
        public storage: AngularFireStorage,
    ) { }

    @action
    fetchData(typeKey: number) {
        this.loading = true;
        this.ds.personDocsRef(typeKey).valueChanges().subscribe(docs => {
            this.data = MappingService.orderBy(docs, "page_key");
            this.empty = docs.length === 0;
            this.loading = false;
        });
    }

    @action
    fetchImages(itemKey: string) {
        this.process = true;
        this.ds.personRef().doc(itemKey).collection("files").valueChanges().subscribe(docs => {
            this.images = docs;
            this.process = false;
        })
    }

    @action
    addNew(item: any, filelist: any, callback) {
        this.process = true;
        this.ds.personRef().doc(item.key).set(item).then(() => {
            this.process = false;
            if (filelist) {
                this.uploads = [];
                const allPercentage: Observable<number>[] = [];
                for (const file of filelist) {
                    const filename = Math.random().toString(36).substring(7) + new Date().getTime() + file.name;
                    const path = `persons/${item.key}/${filename}`;
                    const ref = this.storage.ref(path);
                    const task = this.storage.upload(path, file);
                    const _percentage$ = task.percentageChanges();
                    allPercentage.push(_percentage$);

                    const uploadTrack = {
                        fileName: filename,
                        percentage: _percentage$
                    }

                    this.uploads.push(uploadTrack);
                    const fkey = this.ds.createId();
                    const _t = task.then((f) => {
                        return f.ref.getDownloadURL().then((url) => {
                            return this.ds.personRef().doc(item.key).collection('files').doc(fkey).set({
                                key: fkey,
                                name: filename,
                                url: url
                            });
                        })
                    })

                }

                this.allPercentage = combineLatest(allPercentage)
                    .pipe(
                        map((percentages) => {
                            let result = 0;
                            for (const percentage of percentages) {
                                result = result + percentage;
                            }
                            return result / percentages.length;
                        }),
                        tap(console.log)
                    );
            }
            callback(true, item)
        }).catch(error => {
            this.process = false;
            callback(false, error)
        });
    }

    @action
    fetchPersonImages(item: any) {
        this.process = true;
        this.ds.crimeDocRef(item.crime_key).collection('persons').doc(item.key).collection('files').valueChanges().subscribe(docs => {
            this.images = docs;
            this.process = false;
        })
    }

    @action
    fetchVerdictImages(item: any) {
        this.process = true;
        this.ds.crimeDocRef(item.crime.key).collection('verdict').doc(item.key).collection('files').valueChanges().subscribe(docs => {
            this.images = docs;
            this.process = false;
        })
    }

    @action
    addNewvictims(item: any, filelist: any, crime: any, user: any, callback) {
        this.process = true;
        const batch = this.ds.batch();
        const { arrested } = item
        const crimeRef = this.ds.crimeFireRef();
        const personRef = this.ds.personFireRef();

        batch.set(crimeRef.doc(item.crime_key).collection('persons').doc(item.key), item);
        batch.set(personRef.doc(item.key), item);

        if (arrested.key === arrestObjStatus.arrested.key) {
            batch.update(crimeRef.doc(item.crime_key), {
                crime_status: crimeStatus.complete,
                complete_by: user,
                complete_data: new Date(),
            })
        }

        batch.commit().then(() => {
            this.process = false;
            if (filelist) {
                this.uploads = [];
                const allPercentage: Observable<number>[] = [];
                for (const file of filelist) {
                    const filename = Math.random().toString(36).substring(7) + new Date().getTime() + file.name;
                    const path = `persons/${item.key}/${filename}`;
                    const ref = this.storage.ref(path);
                    const task = this.storage.upload(path, file);
                    const _percentage$ = task.percentageChanges();
                    allPercentage.push(_percentage$);

                    const uploadTrack = {
                        fileName: filename,
                        percentage: _percentage$
                    }

                    this.uploads.push(uploadTrack);
                    const fkey = this.ds.createId();
                    const _t = task.then(async (f) => {
                        return f.ref.getDownloadURL().then((url) => {
                            const batch = this.ds.batch();
                            const crimeRef = this.ds.crimeFireRef();
                            const personRef = this.ds.personFireRef();
                            const data = {
                                key: fkey,
                                name: filename,
                                url: url,
                                type: item.person_type
                            }
                            batch.set(crimeRef.doc(item.crime_key).collection('files').doc(fkey), data);
                            batch.set(crimeRef.doc(item.crime_key).collection('persons').doc(item.key).collection('files').doc(fkey), data);
                            batch.update(crimeRef.doc(item.crime_key).collection('persons').doc(item.key), { file: data })
                            batch.update(personRef.doc(item.key), { file: data });

                            batch.commit();
                        })
                    })

                }

                this.allPercentage = combineLatest(allPercentage)
                    .pipe(
                        map((percentages) => {
                            let result = 0;
                            for (const percentage of percentages) {
                                result = result + percentage;
                            }
                            return result / percentages.length;
                        }),
                        tap(console.log)
                    );
            }
            callback(true, item)
        }).catch(error => {
            this.process = false;
            callback(false, error)
        });
    }

    @action
    updatevictims(item: any, filelist: any, callback) {
        this.process = true;
        this.ds.crimeFireRef().doc(item.crime_key).collection('persons').doc(item.key).update(item).then(() => {
            this.process = false;
            if (filelist) {
                this.uploads = [];
                const allPercentage: Observable<number>[] = [];
                for (const file of filelist) {
                    const filename = Math.random().toString(36).substring(7) + new Date().getTime() + file.name;
                    const path = `persons/${item.key}/${filename}`;
                    const ref = this.storage.ref(path);
                    const task = this.storage.upload(path, file);
                    const _percentage$ = task.percentageChanges();
                    allPercentage.push(_percentage$);

                    const uploadTrack = {
                        fileName: filename,
                        percentage: _percentage$
                    }

                    this.uploads.push(uploadTrack);
                    const fkey = this.ds.createId();
                    const _t = task.then((f) => {
                        return f.ref.getDownloadURL().then((url) => {
                            const batch = this.ds.batch();
                            const crimeRef = this.ds.crimeFireRef();
                            const personRef = this.ds.personFireRef();
                            const data = {
                                key: fkey,
                                name: filename,
                                url: url,
                                type: item.person_type
                            }
                            batch.set(crimeRef.doc(item.crime_key).collection('files').doc(fkey), data);
                            batch.set(crimeRef.doc(item.crime_key).collection('persons').doc(item.key).collection('files').doc(fkey), data);
                            batch.update(crimeRef.doc(item.crime_key).collection('persons').doc(item.key), { file: data })
                            batch.update(personRef.doc(item.key), { file: data });
                            batch.commit();
                        })
                    })

                }

                this.allPercentage = combineLatest(allPercentage)
                    .pipe(
                        map((percentages) => {
                            let result = 0;
                            for (const percentage of percentages) {
                                result = result + percentage;
                            }
                            return result / percentages.length;
                        }),
                        tap(console.log)
                    );
            }
            callback(true, item)
        }).catch(error => {
            this.process = false;
            callback(false, error)
        });
    }


    @action
    update(item: any, filelist: any, callback) {
        this.process = true;
        this.ds.personRef().doc(item.key).update(item).then(() => {
            this.process = false;
            if (filelist) {
                this.uploads = [];
                const allPercentage: Observable<number>[] = [];
                for (const file of filelist) {
                    const filename = Math.random().toString(36).substring(7) + new Date().getTime() + file.name;
                    const path = `persons/${item.key}/${filename}`;
                    const ref = this.storage.ref(path);
                    const task = this.storage.upload(path, file);
                    const _percentage$ = task.percentageChanges();
                    allPercentage.push(_percentage$);

                    const uploadTrack = {
                        fileName: filename,
                        percentage: _percentage$
                    }

                    this.uploads.push(uploadTrack);
                    const fkey = this.ds.createId();
                    const _t = task.then((f) => {
                        return f.ref.getDownloadURL().then((url) => {
                            return this.ds.personRef().doc(item.key).collection('files').doc(fkey).set({
                                key: fkey,
                                name: filename,
                                url: url
                            });
                        })
                    })

                }

                this.allPercentage = combineLatest(allPercentage)
                    .pipe(
                        map((percentages) => {
                            let result = 0;
                            for (const percentage of percentages) {
                                result = result + percentage;
                            }
                            return result / percentages.length;
                        }),
                        tap(console.log)
                    );
            }
            callback(true, item)
        }).catch(error => {
            this.process = false;
            callback(false, error)
        });
    }

    @action
    delete(item: any, callback) {
        this.process = true;
        this.ds.personRef().doc(item.key).delete().then(() => {
            this.process = false;
            callback(true, null)
        }).catch(error => {
            this.process = false;
            callback(false, error)
        });
    }

}