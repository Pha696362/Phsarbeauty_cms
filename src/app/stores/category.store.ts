import { DataService } from "../services/data.service";
import { observable, action } from "mobx";
import { Injectable } from "@angular/core";
import { ISubCategory } from '../interfaces/geo';
import { ApiService } from '../services/api.service';

@Injectable()
export class Category {
    @observable data = [];
    @observable loading = false;
    @observable empty = false;
    @observable process = false;
    @observable selectedCategory = null;
    @observable subCategory = [];
    @observable public place = null;

    constructor(private ds: DataService, private api: ApiService) { }

    @action
    fetchData() {
        this.loading = true;
        this.ds.categoryRef().valueChanges().subscribe(docs => {
            this.data = docs;
            this.empty = docs.length === 0;
            this.loading = false;
        });
    }

    @action
    fetchDataApi() {
        this.loading = true;
        this.api.get(`${this.api.baseUri}category`).then((docs) => {
            this.data = docs.map(m => ({ ...m, name: m.Name }));
            this.empty = docs.length === 0;
            this.loading = false;
        });
    }

    @action
    fetchSubCategory(categoryKey) {
        this.loading = true;
        this.ds.subCategoryRef(categoryKey).valueChanges().subscribe(docs => {
            this.subCategory = docs;
            this.empty = docs.length === 0;
            this.loading = false;
        });
    }

    @action
    fetchSubCategoryApi(categoryKey) {
        this.loading = true;
        this.api.get(`${this.api.baseUri}case`).then((docs) => {
            const data = docs.filter(m => m.OffenceId === categoryKey);
            this.subCategory = data.map(m => ({ ...m, name: m.Name }));
            this.empty = docs.length === 0;
            this.loading = false;
        });
    }

    @action
    fetchSelectedCategory(categoryKey) {
        this.loading = true;
        this.ds.categoryRef().doc(categoryKey).valueChanges().subscribe(docs => {
            this.selectedCategory = docs;
            this.loading = false;
        });
    }

    @action
    fetchSelectedCategoryApi(categoryKey) {
        this.loading = true;
        this.api.get(`${this.api.baseUri}category`).then((docs) => {
            const data = docs.filter(m => m.Id === categoryKey);
            this.selectedCategory = data.map(m => ({ ...m, name: m.Name }))[0];
            this.loading = false;
        });
    }

    @action
    deleteSubCategory(key, callback) {
        this.process = true;
        this.ds.subCategoryRef().doc(key).delete().then(() => {
            this.process = false;
            callback(true, null)
        }).catch(error => {
            this.process = false;
            callback(false, error)

        })
    }

    @action
    addSubCategory(item: ISubCategory, callback) {
        this.process = true;
        this.ds.subCategoryRef().doc(item.key).set(item).then(() => {
            this.process = false;
            callback(true, null)
        }).catch(error => {
            this.process = false;
            callback(false, error)

        })
    }

}