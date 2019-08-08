import { IData } from './../interfaces/geo';
import { DataService } from "../services/data.service";
import { observable, action } from "mobx";
import { Injectable } from "@angular/core";
import { ApiService } from '../services/api.service';

@Injectable()
export class Management {
    @observable data = [];
    @observable loading = false;
    @observable empty = false;
    @observable process = false;
    @observable selectedItem = null;

    constructor(private ds: DataService, private api: ApiService) { }

    @action
    fetchData(collectionName) {
        this.loading = true;
        this.ds.managementRef(collectionName).valueChanges().subscribe(docs => {
            this.data = docs;
            this.empty = docs.length === 0;
            this.loading = false;
        });
    }

    @action
    fetchDataApi(collectionName) {
        this.loading = true;
        this.api.get(`${this.api.baseUri}${collectionName}`).then((docs) => {
            this.data = docs.map(m => ({ ...m, name: m.Name }));
            this.empty = docs.length === 0;
            this.loading = false;
        });
    }

    @action
    fetchSelectedItem(collectionName, key) {
        this.loading = true;
        this.ds.managementRef(collectionName).doc(key).valueChanges().subscribe(docs => {
            this.selectedItem = docs;
            this.loading = false;
        });
    }

    @action
    delete(collectionName, key, callback) {
        this.process = true;
        this.ds.managementRef(collectionName).doc(key).delete().then(() => {
            this.process = false;
            callback(true, null)
        }).catch(error => {
            this.process = false;
            callback(false, error)

        })
    }


    @action
    update(collectionName, f: any, callback) {
        this.process = true;
        this.ds.managementRef(collectionName).doc(f.key).update(f).then(() => {
            this.process = false;
            callback(true, null)
        }).catch(error => {
            this.process = false;
            callback(false, error)

        })
    }



    @action
    addItem(collectionName, item: IData, callback) {
        this.process = true;
        this.ds.managementRef(collectionName).doc(item.key).set(item).then(() => {
            this.process = false;
            callback(true, null)
        }).catch(error => {
            this.process = false;
            callback(false, error)

        })
    }

}