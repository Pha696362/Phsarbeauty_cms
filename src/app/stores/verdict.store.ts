import { IGeo, IDistrict, ICommunes, IVillage } from './../interfaces/geo';
import { DataService } from "../services/data.service";
import { observable, action } from "mobx";
import { Injectable } from "@angular/core";
import { MappingService } from '../services/mapping.service';
import { ConvertService } from '../services/convert.service';
import { ICrime } from '../interfaces/crime';
import { personTypeObj, recordStatus } from '../dummy/stauts';
import { IVerdict } from '../interfaces/verdict';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class Verdict {
    @observable loading = false;
    @observable empty = false;
    @observable process = false;
    @observable data = [];
    @observable images = [];
    @observable crimes = [];
    @observable judges = [];
    @observable judgeWriters = [];

    uploads: any[];
    allPercentage: Observable<any>;
    files: Observable<any>;
    constructor(
        private ds: DataService,
        public storage: AngularFireStorage,
    ) { }

    @action
    fetchData() {
        this.loading = true;
        this.ds.verdictRef().valueChanges().subscribe(docs => {
            this.data = MappingService.orderBy(docs, "page_key");
            this.empty = docs.length === 0;
            this.loading = false;
        })
    }

    @action
    fetchImages(itemKey: string) {
        this.process = true;
        this.ds.verdictRef().doc(itemKey).collection("files").valueChanges().subscribe(docs => {
            this.images = docs;
            this.process = false;
        })
    }

    @action
    fetchCrime(callback) {
        this.process = true;
        this.ds.crimeRef().valueChanges().subscribe(docs => {
            this.crimes = docs;
            this.process = false;
            callback(this.crimes);
        });
    }

    @action
    fetchJudge(callback) {
        this.process = true;
        this.ds.personDocsRef(personTypeObj.judge.key).valueChanges().subscribe(docs => {
            this.judges = docs;
            this.process = false;
            callback(this.judges);
        });
    }

    @action
    fetchJudgeWriter(callback) {
        this.process = true;
        this.ds.personDocsRef(personTypeObj.judgmentWriter.key).valueChanges().subscribe(docs => {
            this.judgeWriters = docs;
            this.process = false;
            callback(this.judgeWriters);
        });
    }

    @action
    addNew(item: IVerdict, filelist: any, callback) {
        this.process = true;
        const { crime } = item;
        const batch = this.ds.batch();
        const crimeRef = this.ds.crimeFireRef().doc(crime.key);
        const verdictRef = this.ds.verdictFireRef();

        batch.set(crimeRef.collection("verdict").doc(item.key), item);
        batch.set(verdictRef.doc(item.key), item);

        batch.commit().then(() => {
            this.process = false;
            if (filelist) {
                this.uploads = [];
                const allPercentage: Observable<number>[] = [];
                for (const file of filelist) {
                    const filename = Math.random().toString(36).substring(7) + new Date().getTime() + file.name;
                    const path = `verdict/${item.key}/${filename}`;
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
                            const verdictRef = this.ds.verdictFireRef();
                            const data = {
                                key: fkey,
                                name: filename,
                                url: url,
                                type: personTypeObj.verdict
                            }
                            batch.set(crimeRef.doc(crime.key).collection('files').doc(fkey), data);
                            batch.set(crimeRef.doc(crime.key).collection('verdict').doc(item.key).collection('files').doc(fkey), data);
                            batch.update(crimeRef.doc(crime.key).collection('verdict').doc(item.key), {
                                file: data,
                            })
                            batch.update(verdictRef.doc(item.key), {
                                file: data,
                            })
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
    updateComplete(item: ICrime, user: any, callback) {
        this.process = true;
        this.ds.verdictRef().doc(item.key).update({
            status: recordStatus.complete,
            complete_date: new Date(),
            complete_by: user,
        }).then(() => {
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(false, error);
        })
    }

    @action
    update(item: IVerdict, filelist: any, callback) {
        this.process = true;
        const { crime } = item;
        const batch = this.ds.batch();
        const crimeRef = this.ds.crimeFireRef().doc(crime.key);
        const verdictRef = this.ds.verdictFireRef();

        batch.update(crimeRef.collection("verdict").doc(item.key), item);
        batch.update(verdictRef.doc(item.key), item);

        batch.commit().then(() => {
            this.process = false;
            if (filelist) {
                this.uploads = [];
                const allPercentage: Observable<number>[] = [];
                for (const file of filelist) {
                    const filename = Math.random().toString(36).substring(7) + new Date().getTime() + file.name;
                    const path = `verdict/${item.key}/${filename}`;
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
                            const verdictRef = this.ds.verdictFireRef();
                            const data = {
                                key: fkey,
                                name: filename,
                                url: url,
                                type: personTypeObj.verdict
                            }
                            batch.set(crimeRef.doc(crime.key).collection('files').doc(fkey), data);
                            batch.set(crimeRef.doc(crime.key).collection('verdict').doc(item.key).collection('files').doc(fkey), data);
                            batch.update(crimeRef.doc(crime.key).collection('verdict').doc(item.key), {
                                file: data,
                            })
                            batch.update(verdictRef.doc(item.key), {
                                file: data,
                            })
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
    delete(item: IVerdict, callback) {
        this.process = true;
        this.ds.verdictRef().doc(item.key).delete().then(() => {
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(false, error);
        })
    }

}
