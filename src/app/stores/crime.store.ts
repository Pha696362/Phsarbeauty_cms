import { IGeo, IDistrict, ICommunes, IVillage } from './../interfaces/geo';
import { DataService } from "../services/data.service";
import { observable, action } from "mobx";
import { Injectable } from "@angular/core";
import { MappingService } from '../services/mapping.service';
import { ConvertService } from '../services/convert.service';
import { ICrime, ICrimeTransfer } from '../interfaces/crime';
import { recordStatus, personTypeObj, judgmentStatus, crimeStatus } from '../dummy/stauts';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { ApiService } from '../services/api.service';

@Injectable()
export class Crime {
    @observable categories = null;
    @observable subCategories = null;
    @observable locations = null;
    @observable locationScenes = null;
    @observable caseReasons = null;
    @observable weapons = null;
    @observable transportation = null;
    @observable otherTransportation = null;
    @observable villages = null;
    @observable loading = false;
    @observable empty = false;
    @observable process = false;
    @observable data = [];
    @observable crimeData = [];
    @observable judgment = null;
    @observable selectedCrime = null;
    @observable crimeKey = null;
    @observable victimImg = [];
    @observable suspectImg = [];
    @observable judgmentImg = [];

    @observable crimeByCommune = [];
    uploads: any[];
    allPercentage: Observable<any>;
    files: Observable<any>;
    constructor(private ds: DataService, public storage: AngularFireStorage, public api: ApiService) { }

    @action
    closeCrime(item: any, filelist: any, callback) {
        this.process = true;
        const batch = this.ds.batch();
        const { crimeKey } = item;
        const crimeRef = this.ds.crimeFireRef();

        batch.set(crimeRef.doc(crimeKey).collection('close_crime').doc(item.key), item);
        batch.update(crimeRef.doc(crimeKey), {
            close_crime: item,
            crime_status: crimeStatus.close,
        })
        batch.commit().then(() => {
            this.process = false;
            if (filelist) {
                this.uploads = [];
                const allPercentage: Observable<number>[] = [];
                for (const file of filelist) {
                    const filename = Math.random().toString(36).substring(7) + new Date().getTime() + file.name;
                    const path = `close_crime/${item.key}/${filename}`;
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
                            const data = {
                                key: fkey,
                                name: filename,
                                url: url,
                            }
                            batch.update(crimeRef.doc(crimeKey).collection('close_crime').doc(item.key), {
                                file: data,
                            })

                            item.file = data;
                            batch.update(crimeRef.doc(crimeKey), {
                                close_crime: item
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
    updateCrimeIndex(callback) {
        this.ds.environmentFireRef().get().then((docs) => {
            const option = docs.data();
            this.ds.environmentRef().update({
                crime_index: option.crime_index + 1,
            }).then(() => {
                callback(true, option)
            }).catch(error => {
                callback(false, error)
            })
        }).catch(error => {
            callback(false, error)
        })
    }

    @action
    fetchData(user: any) {
        this.loading = true;
        this.ds.crimeByUserRef(user).valueChanges().subscribe(docs => {
            this.data = docs;
            this.empty = docs.length === 0;
            this.loading = false;
        })
    }

    @action
    fetchStatistic(province,formDate,toDate) {
        this.loading = true;
        this.api.get(`${this.api.baseUri}statisticSummary?province=${province}&fromDate=${formDate}&toDate=${toDate}`).then((res) => {
            this.loading = false;
        })
    }

    @action
    async fetchFailData() {
        this.loading = true;
        const crimeData = await this.ds.crimeFailRef().get().toPromise();
        this.data = MappingService.pushToArray(crimeData);
        this.empty = await this.data.length === 0;
        this.loading = false;
    }

    @action
    updateFailData(item: any, callback) {
        this.process = true;
        this.ds.crimeDocRef(item.key).update({ has_evident: true }).then(() => {
            this.data = this.data.filter(m => m.key !== item.key);
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(true, error);
        })
    }


    @action
    fetchFitlterData(user: any, pro?: any, dis?: any, com?: any, cat?: any, subcat?: any, fromdate?: any, todate?: any) {
        this.loading = true;
        this.data = []
        this.ds.filterCrimeByUserRef(user, pro, dis, com, cat, subcat, fromdate, todate).get().then(snapshot => {
            if (snapshot) {
                snapshot.forEach(data => {
                    this.data.push(data.data())
                    this.empty = this.data.length === 0;
                })
            } else {
                this.data = []
            }
            this.loading = false;
        })
    }

    @action
    fetchCrimeDoc(key: string) {
        this.loading = true;
        this.ds.crimeRef().doc(key).valueChanges().subscribe(doc => {
            this.selectedCrime = doc;
            this.loading = false;
        });
    }

    @action
    fetchCrimeCommune(communeKey: string) {
        this.process = true;
        this.crimeByCommune = [];
        this.ds.crimeByCommuneRef(communeKey).valueChanges().subscribe(doc => {
            this.crimeByCommune = doc;
            this.process = false;
        });
    }

    @action
    fetchCrimeDocCallback(key: string, callback) {
        this.loading = true;
        this.ds.crimeRef().doc(key).valueChanges().subscribe(doc => {
            this.selectedCrime = doc;
            this.loading = false;
            callback(doc)
        });
    }

    @action
    fetchCrimePersonFile(key: string) {
        this.loading = true;
        this.victimImg = [];
        this.suspectImg = [];
        this.ds.crimeDocRef(key).collection("persons").valueChanges().subscribe(docs => {
            if (docs.length > 0) {
                this.victimImg = docs.filter(m => m.file && m.person_type.key === personTypeObj.victim.key);
                this.suspectImg = docs.filter(m => m.file && m.person_type.key === personTypeObj.suspect.key);
            }
            this.loading = false;
        })
    }

    @action
    fetchCrimeJudgmentFile(key: string) {
        this.loading = true;
        this.judgmentImg = [];
        this.ds.crimeDocRef(key).collection("files").valueChanges().subscribe(docs => {
            if (docs.length > 0) {
                this.judgmentImg = docs.filter(m => m.type.key === personTypeObj.verdict.key);
            }
            this.loading = false;
        })
    }

    @action
    fetchExhibitsCrime(key: string, typeKey) {
        this.loading = true;
        this.ds.crimeRef().doc(key).collection('exhibits', ref => ref.where('type.key', '==', typeKey)).valueChanges().subscribe(docs => {
            this.loading = false;
            this.crimeData = docs;
        })
    }

    @action
    deleteExhibitsCrime(crimeKey, item: any, callback) {
        this.process = true;
        this.ds.crimeRef().doc(crimeKey).collection('exhibits').doc(item.key).delete().then(() => {
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(false, error);
        })
    }


    @action
    fetchmateriallostCrime(key: string, typeKey) {
        this.loading = true;
        this.ds.crimeRef().doc(key).collection('material_lost', ref => ref.where('type.key', '==', typeKey)).valueChanges().subscribe(docs => {
            this.loading = false;
            this.crimeData = docs;
        })
    }

    @action
    deletemateriallostCrime(crimeKey, item: any, callback) {
        this.process = true;
        this.ds.crimeRef().doc(crimeKey).collection('material_lost').doc(item.key).delete().then(() => {
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(false, error);
        })
    }


    @action
    fetchpersonCrime(key: string, col) {
        this.loading = true;
        this.crimeData = null;
        this.ds.crimeRef().doc(key).collection(col).valueChanges().subscribe(docs => {
            this.loading = false;
            this.crimeData = docs;
        })
    }

    @action
    fetchJudgmentCrime(key: string) {
        this.loading = true;
        this.ds.crimeRef().doc(key).collection('verdict').valueChanges().subscribe(docs => {
            this.loading = false;
            this.judgment = docs;
        })
    }

    @action
    deletepersonCrime(crimeKey, item: any, callback) {
        this.process = true;
        this.ds.crimeRef().doc(crimeKey).collection('persons').doc(item.key).delete().then(() => {
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(false, error);
        })
    }

    @action
    fetchinvestigationCrime(key: string, typeKey) {
        this.loading = true;
        this.ds.crimeRef().doc(key).collection('investigation', ref => ref.where('type.key', '==', typeKey)).valueChanges().subscribe(docs => {
            this.loading = false;
            this.crimeData = docs;

        })
    }

    @action
    deleteinvestigationCrime(crimeKey, item: any, callback) {
        this.process = true;
        this.ds.crimeRef().doc(crimeKey).collection('investigation').doc(item.key).delete().then(() => {
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(false, error);
        })
    }

    @action
    transferCrime(form: any, items: Array<any>, villages, callback) {
        this.process = true;
        const batch = this.ds.batch();
        const crimeRef = this.ds.crimeFireRef();
        const crimeTransferRef = this.ds.crimeTransferFireRef();
        const { province, district, commune, province_to, district_to, commune_to } = form;

        items.forEach(m => {
            const newKEy = this.ds.createId();
            batch.set(crimeRef.doc(newKEy), {
                ...m,
                key: newKEy,
                province: province,
                district: district,
                commune: commune,
                village: villages[0],
            })
            batch.set(crimeTransferRef.doc(newKEy), {
                ...m,
                key: newKEy,
                province: province,
                district: district,
                commune: commune,
                province_from: province_to,
                district_from: district_to,
                commune_from: commune_to,
                village_new: villages[0],
            })

            batch.delete(crimeRef.doc(m.key))
        })

        batch.commit().then(() => {
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(false, error);
        })
    }

    async fetchConfig(callback) {
        this.process = true;
        const categoryDoc = await this.ds.categoryRef().get().toPromise();
        const categoryData = MappingService.pushToArray(categoryDoc);
        this.categories = categoryData.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
        this.categories = MappingService.orderBy(this.categories, "orderBy");

        const subCategoryDoc = await this.ds.subCategoryRef().get().toPromise();
        const subCategoryData = MappingService.pushToArray(subCategoryDoc);
        this.subCategories = subCategoryData.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
        this.subCategories = MappingService.orderBy(this.subCategories, "orderBy");

        const locationDoc = await this.ds.locationRef().get().toPromise();
        const locationData = MappingService.pushToArray(locationDoc);
        this.locations = locationData.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
        this.locations = MappingService.orderBy(this.locations, "orderBy");

        const locationSceneDoc = await this.ds.locationSceneRef().get().toPromise();
        const locationSceneData = MappingService.pushToArray(locationSceneDoc);
        this.locationScenes = locationSceneData.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
        this.locationScenes = MappingService.orderBy(this.locationScenes, "orderBy");

        const caseReasonDoc = await this.ds.caseReasonRef().get().toPromise();
        const caseReasonData = MappingService.pushToArray(caseReasonDoc);
        this.caseReasons = caseReasonData.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
        this.caseReasons = MappingService.orderBy(this.caseReasons, "orderBy");

        const transportationDoc = await this.ds.transportationRef().get().toPromise();
        const transportationData = MappingService.pushToArray(transportationDoc);
        this.transportation = transportationData.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
        this.transportation = MappingService.orderBy(this.transportation, "orderBy");

        const weaponDoc = await this.ds.weaponRef().get().toPromise();
        const weaponData = MappingService.pushToArray(weaponDoc);
        this.weapons = weaponData.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
        this.weapons = MappingService.orderBy(this.weapons, "orderBy");

        const transportationOtherDoc = await this.ds.transportationOtherRef().get().toPromise();
        const transportationOtherData = MappingService.pushToArray(transportationOtherDoc);
        this.otherTransportation = transportationOtherData.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
        this.otherTransportation = MappingService.orderBy(this.otherTransportation, "orderBy");

        // const villageDoc = await this.ds.villageRef().get().toPromise();
        // const villageData = MappingService.pushToArray(villageDoc);
        // this.villages = villageData.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
        // this.villages = MappingService.orderBy(this.villages, "orderBy");

        this.process = false;
        callback(this.villages)
    }

    @action
    fetchCategories(callback) {
        this.process = true;
        this.ds.categoryRef().valueChanges().subscribe(docs => {
            const list = docs.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
            this.categories = MappingService.orderBy(list, "orderBy");
            this.process = false;
            callback(this.categories);
        });
    }

    @action
    fetchSubCategories(callback) {
        this.process = true;
        this.ds.subCategoryRef().valueChanges().subscribe(docs => {
            const list = docs.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
            this.subCategories = MappingService.orderBy(list, "orderBy");
            this.process = false;
            callback(this.subCategories);
        });
    }

    @action
    fetchLocations(callback) {
        this.process = true;
        this.ds.locationRef().valueChanges().subscribe(docs => {
            const list = docs.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
            this.locations = MappingService.orderBy(list, "orderBy");
            this.process = false;
            callback(this.locations);
        });
    }

    @action
    fetchLocationScenes(callback) {
        this.process = true;
        this.ds.locationSceneRef().valueChanges().subscribe(docs => {
            const list = docs.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
            this.locationScenes = MappingService.orderBy(list, "orderBy");
            this.process = false;
            callback(this.locationScenes);
        });
    }

    @action
    fetchCaseReason(callback) {
        this.process = true;
        this.ds.caseReasonRef().valueChanges().subscribe(docs => {
            const list = docs.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
            this.caseReasons = MappingService.orderBy(list, "orderBy");
            this.process = false;
            callback(this.caseReasons);
        });
    }

    @action
    fetchWeapon(callback) {
        this.process = true;
        this.ds.weaponRef().valueChanges().subscribe(docs => {
            const list = docs.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
            this.weapons = MappingService.orderBy(list, "orderBy");
            this.process = false;
            callback(this.weapons);
        });
    }

    @action
    fetchTransportation(callback) {
        this.process = true;
        this.ds.transportationRef().valueChanges().subscribe(docs => {
            const list = docs.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
            this.transportation = MappingService.orderBy(list, "orderBy");
            this.process = false;
            callback(this.transportation);
        });
    }

    @action
    fetchOtherTransportation(callback) {
        this.process = true;
        this.ds.transportationOtherRef().valueChanges().subscribe(docs => {
            const list = docs.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
            this.otherTransportation = MappingService.orderBy(list, "orderBy");
            this.process = false;
            callback(this.otherTransportation);
        });
    }

    @action
    fetchVillages(callback) {
        this.process = true;
        this.ds.villageRef().valueChanges().subscribe(docs => {
            const list = docs.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
            this.villages = MappingService.orderBy(list, "orderBy");
            this.process = false;
            callback(this.villages);
        });
    }

    @action
    fetchVillagesByCommune(communeKey: string, callback) {
        this.process = true;
        this.ds.villageRef(communeKey).valueChanges().subscribe(docs => {
            const list = docs.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
            this.villages = MappingService.orderBy(list, "orderBy");
            this.process = false;
            callback(this.villages);
        });
    }

    @action
    async transfer(item: ICrime, transfer: ICrimeTransfer, callback) {
        this.process = true;
        const batch = this.ds.batch();
        const { village, transfer_date, transfer_by, transfer_to } = transfer;
        const crimeDoc = await this.ds.crimeDocRef(item.key).get().toPromise();
        const crimeData = MappingService.pushToObject(crimeDoc);

        const { create_by, notifications, tags } = crimeData;

        const crimeRef = this.ds.crimeFireRef().doc(item.key);
        const crimeTransferRef = this.ds.crimeTransferFireRef().doc(transfer.key);

        batch.update(crimeRef, {
            village: village,
            transfer_date: transfer_date,
            transfer_by: transfer_by,
            create_by: transfer_to,
            owner_by: create_by,
            notifications: MappingService.fieldArrayValues(notifications, transfer_to),
            tags: MappingService.fieldArrayValues(tags, transfer_to),
        });
        batch.set(crimeRef.collection("notifications").doc(transfer_to.key), {
            key: transfer_to.key,
            displayName: transfer_to.displayName,
        });
        batch.set(crimeRef.collection("tags").doc(transfer_to.key), {
            key: transfer_to.key,
            displayName: transfer_to.displayName,
        });

        transfer.owner_by = create_by;
        batch.set(crimeTransferRef, transfer);

        batch.commit().then(() => {
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(false, error);
        })
    }

    @action
    addNew(item: ICrime, callback) {
        this.process = true;
        const batch = this.ds.batch();
        const crimeRef = this.ds.crimeFireRef().doc(item.key);
        let { weapon, weapon_other, create_by } = item;

        if (weapon && weapon.length > 0) {
            weapon.forEach(wea => {
                batch.set(crimeRef.collection("weapons").doc(wea.key), wea);
            })
        }
        if (weapon_other && weapon_other.length > 0) {
            weapon_other.forEach(otherWea => {
                batch.set(crimeRef.collection("other_weapons").doc(otherWea.key), otherWea);
            })
        }

        batch.set(crimeRef.collection("notifications").doc(create_by.key), {
            key: create_by.key,
            displayName: create_by.displayName,
        });
        batch.set(crimeRef.collection("tags").doc(create_by.key), {
            key: create_by.key,
            displayName: create_by.displayName,
        });

        batch.set(crimeRef, item);

        batch.commit().then(() => {
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(false, error);
        })
    }

    @action
    addNewExhibits(item: any, callback) {
        this.process = true;
        const Ref = this.ds.crimeFireRef().doc(item.crime_key).collection('exhibits').doc(item.key);
        Ref.set(item).then(() => {
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(false, error);
        })

    }
    @action
    EditExhibits(item: any, callback) {
        this.process = true;
        const Ref = this.ds.crimeFireRef().doc(item.crime_key).collection('exhibits').doc(item.key);
        Ref.update(item).then(() => {
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(false, error);
        })

    }
    @action
    addNewmateriallost(item: any, callback) {
        this.process = true;
        const Ref = this.ds.crimeFireRef().doc(item.crime_key).collection('material_lost').doc(item.key);
        Ref.set(item).then(() => {
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(false, error);
        })

    }

    @action
    editmateriallost(item: any, callback) {
        this.process = true;
        const Ref = this.ds.crimeFireRef().doc(item.crime_key).collection('material_lost').doc(item.key);
        Ref.update(item).then(() => {
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(false, error);
        })

    }


    @action
    addNewinvestigation(item: any, callback) {
        this.process = true;
        const Ref = this.ds.crimeFireRef().doc(item.crime_key).collection('investigation').doc(item.key);
        Ref.set(item).then(() => {
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(false, error);
        })

    }
    @action
    editinvestigation(item: any, callback) {
        this.process = true;
        const Ref = this.ds.crimeFireRef().doc(item.crime_key).collection('investigation').doc(item.key);
        Ref.update(item).then(() => {
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(false, error);
        })

    }


    async update(item: ICrime, callback) {
        this.process = true;
        const batch = this.ds.batch();
        const crimeRef = this.ds.crimeFireRef().doc(item.key);
        let { weapon, weapon_other } = item;

        // const weaponDoc = await this.ds.crimeDocRef(item.key).collection("weapons").get().toPromise();
        // const weaponData = MappingService.pushToArray(weaponDoc);

        // const otherWeaponsDoc = await this.ds.crimeDocRef(item.key).collection("other_weapons").get().toPromise();
        // const otherWeaponsData = MappingService.pushToArray(otherWeaponsDoc);

        // if (weaponData && weaponData.length > 0) {
        //     weaponData.forEach(m => {
        //         batch.delete(crimeRef.collection("weapons").doc(m.key));
        //     })
        // }

        // if (otherWeaponsData && otherWeaponsData.length > 0) {
        //     otherWeaponsData.forEach(m => {
        //         batch.delete(crimeRef.collection("other_weapons").doc(m.key));
        //     })
        // }

        if (weapon && weapon.length > 0) {
            weapon.forEach(wea => {
                batch.set(crimeRef.collection("weapons").doc(wea.key), wea);
            })
        }
        if (weapon_other && weapon_other.length > 0) {
            weapon_other.forEach(otherWea => {
                batch.set(crimeRef.collection("other_weapons").doc(otherWea.key), otherWea);
            })
        }

        batch.update(crimeRef, item);

        batch.commit().then(() => {
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(false, error);
        })
    }

    @action
    completeVerdict(item: any, user: any, callback) {
        this.process = true;
        const batch = this.ds.batch();
        const verdictRef = this.ds.verdictFireRef();
        const crimeRef = this.ds.crimeFireRef();

        const data = {
            judgment_status: judgmentStatus.complete,
            complete_date: new Date(),
            complete_by: user,
        }
        batch.update(verdictRef.doc(item.key), { ...data })
        batch.update(crimeRef.doc(item.crime.key).collection("verdict").doc(item.key), { ...data })

        batch.commit().then(() => {
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(false, error);
        })
    }

    @action
    updateComplete(item: ICrime, user: any, callback) {
        this.process = true;
        this.ds.crimeRef().doc(item.key).update({
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
    delete(item: ICrime, callback) {
        this.process = true;
        this.ds.crimeRef().doc(item.key).delete().then(() => {
            this.process = false;
            callback(true, null);
        }).catch(error => {
            this.process = false;
            callback(false, error);
        })
    }

}
