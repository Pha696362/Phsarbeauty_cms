import { IGeo, IDistrict, ICommunes, IVillage } from './../interfaces/geo';
import { DataService } from "../services/data.service";
import { observable, action } from "mobx";
import { Injectable } from "@angular/core";
import { MappingService } from '../services/mapping.service';
import { ConvertService } from '../services/convert.service';
import { roleObj } from '../dummy/roles';

@Injectable()
export class Geo {
    @observable provinces = [];
    @observable districts = [];
    @observable communes = [];
    @observable villages = [];
    @observable positions = [];
    @observable titles = [];
    @observable loading = false;
    @observable empty = false;
    @observable process = false;

    @observable selectedProvince = null;
    @observable selectedDistrict = null;
    @observable selectedCommune = null;


    constructor(private ds: DataService) { }

    @action
    fetchProvince() {
        this.loading = true;
        this.ds.provincesRef().valueChanges().subscribe(docs => {
            const list = docs.map(m => ({ ...m, orderBy: ConvertService.toNumber(m.code) }))
            this.provinces = MappingService.orderBy(list, "orderBy");
            this.empty = docs.length === 0;
            this.loading = false;
        });
    }

    @action
    fetchPositionToArray(callback) {
        this.process = true;
        this.ds.positionsRef().valueChanges().subscribe(docs => {
            callback(docs);
            this.process = false;
        });
    }

    @action
    fetchTitleToArray(callback) {
        this.process = true;
        this.ds.titlesRef().valueChanges().subscribe(docs => {
            this.process = false;
            callback(docs);
        });
    }

    @action
    fetchProvinceToArray(callback) {
        this.process = true;
        this.ds.provincesRef().valueChanges().subscribe(docs => {
            callback(docs);
            this.process = false;
        });
    }

    @action
    fetchDistrictsToArray(provinceKey, callback) {
        this.process = true;
        this.ds.districtRef(provinceKey).valueChanges().subscribe(docs => {
            const list = MappingService.orderBy(docs, "code");
            callback(list)
            this.process = false;
        });
    }

    @action
    fetchUsersToArray(provinceKey, callback) {
        this.process = true;
        this.ds.userByProvinceRef(provinceKey).valueChanges().subscribe(docs => {
            if (docs.length > 0) {
                const list = docs.filter(m => m.role.key === roleObj.readWrite.key);
                this.process = false;
                callback(list)
            } else {
                this.process = false;
                callback(null)
            }
        });
    }

    @action
    fetchCommunesToArray(districtKey, callback) {
        this.process = true;
        this.ds.communeRef(districtKey).valueChanges().subscribe(docs => {
            const list = MappingService.orderBy(docs, "code");
            callback(list)
            this.process = false;
        });
    }

    @action
    fetchVillagesToArray(communeKey, callback) {
        this.process = true;
        this.ds.villageRef(communeKey).valueChanges().subscribe(docs => {
            const list = MappingService.orderBy(docs, "code");
            this.process = false;
            callback(list)
        });
    }

    @action
    fetchDistricts(provinceKey) {
        this.loading = true;
        this.ds.districtRef(provinceKey).valueChanges().subscribe(docs => {
            this.districts = MappingService.orderBy(docs, "code");
            this.empty = docs.length === 0;
            this.loading = false;
        });
    }

    @action
    fetchVillages(communeKey) {
        this.loading = true;
        this.ds.villageRef(communeKey).valueChanges().subscribe(docs => {
            this.villages = MappingService.orderBy(docs, "code");
            this.empty = docs.length === 0;
            this.loading = false;
        });
    }

    @action
    fetchCommunes(districtKey) {
        this.loading = true;
        this.ds.communeRef(districtKey).valueChanges().subscribe(docs => {
            this.communes = MappingService.orderBy(docs, "code");
            this.empty = docs.length === 0;
            this.loading = false;
        });
    }

    @action
    fetchSelectedDistrict(key, callback) {
        this.loading = true;
        this.ds.districtRef().doc<any>(key).valueChanges().subscribe(doc => {
            this.selectedDistrict = MappingService.districtObj(doc);
            if (doc) {
                this.selectedProvince = doc.province;
            }
            callback(doc);
            this.loading = false;
        })
    }


    @action
    fetchSelectedProvince(provinceKey) {
        this.ds.provincesRef().doc(provinceKey).valueChanges().subscribe(doc => {
            this.selectedProvince = MappingService.provinceObj(doc);
        })
    }

    @action
    fetchSelectedCommune(key, callback) {
        this.loading = true;
        this.ds.communeRef().doc<any>(key).valueChanges().subscribe(doc => {
            this.selectedCommune = MappingService.communeObj(doc);
            if (doc) {
                this.selectedProvince = doc.province;
                this.selectedDistrict = doc.district;
            }
            callback(doc);
            this.loading = false;
        })
    }

    @action
    addProvince(form: IGeo, callback) {
        this.process = true;
        this.ds.provincesRef().doc(form.key).set(form).then(() => {
            this.process = false;
            callback(true, null)
        }).catch(error => {
            this.process = false;
            callback(false, error)

        })
    }

    @action
    UpdateProvince(form: IGeo, callback) {
        this.process = true;
        this.ds.provincesRef().doc(form.key).update(form).then(() => {
            this.process = false;
            callback(true, null)
        }).catch(error => {
            this.process = false;
            callback(false, error)

        })
    }

    @action
    deleteDistrict(key, callback) {
        this.process = true;
        this.ds.districtRef().doc(key).delete().then(() => {
            this.process = false;
            callback(true, null)
        }).catch(error => {
            this.process = false;
            callback(false, error)

        })
    }
    @action
    deleteProvince(key, callback) {
        this.process = true;
        this.ds.provincesRef().doc(key).delete().then(() => {
            this.process = false;
            callback(true, null)
        }).catch(error => {
            this.process = false;
            callback(false, error)

        })
    }


    @action
    addDistrict(form: IDistrict, callback) {
        this.ds.districtRef().doc(form.key).set(form).then(() => {
            callback(true, null)
        }).catch(error => {
            callback(false, error)
        })
    }


    @action
    updateDistrict(form: IDistrict, callback) {
        this.ds.districtRef().doc(form.key).update(form).then(() => {
            callback(true, null)
        }).catch(error => {
            callback(false, error)
        })
    }

    @action
    addCommune(form: ICommunes, callback) {
        this.ds.communeRef().doc(form.key).set(form).then(() => {
            callback(true, null)
        }).catch(error => {
            callback(false, error)
        })
    }

    @action
    updateCommune(form: ICommunes, callback) {
        this.ds.communeRef().doc(form.key).update(form).then(() => {
            callback(true, null)
        }).catch(error => {
            callback(false, error)
        })
    }

    @action
    addVillage(form: IVillage, callback) {
        this.ds.villageRef().doc(form.key).set(form).then(() => {
            callback(true, null)
        }).catch(error => {
            callback(false, error)
        })
    }


    @action
    updateVillage(form: IVillage, callback) {
        this.ds.villageRef().doc(form.key).update(form).then(() => {
            callback(true, null)
        }).catch(error => {
            callback(false, error)
        })
    }

    @action
    deleteCommune(key, callback) {
        this.process = true;
        this.ds.communeRef().doc(key).delete().then(() => {
            this.process = false;
            callback(true, null)
        }).catch(error => {
            this.process = false;
            callback(false, error)

        })
    }
    @action
    deleteVillage(key, callback) {
        this.process = true;
        this.ds.villageRef().doc(key).delete().then(() => {
            this.process = false;
            callback(true, null)
        }).catch(error => {
            this.process = false;
            callback(false, error)

        })
    }

}
