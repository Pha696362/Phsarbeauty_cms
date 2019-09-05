import { DataService } from 'src/app/services/data.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { observable, action } from "mobx";
import { Injectable } from "@angular/core";
import { pushToArray } from '../services/utils.lib';

@Injectable()
export class Subscriber {
  @observable data = [];
  @observable loading = true;
  @observable memberships = [];
  @observable empty = false;
  @observable process = false;
  @observable FILTER_OPTIONS_TYPES:any=null;

  constructor(public ds: DataService) { }

  @action
  async fetchPackage(){
    const docs=await this.ds.productRef().get().toPromise();
    return pushToArray(docs);
  }

  @action
  async fetchSubscriber(){
    this.loading=true;
    const docs=await this.ds.subscriberRef().get().toPromise();
    this.memberships=pushToArray(docs);
    this.loading=false;
  }
  
  @action
  search(field,search){
    return this.ds.subscriberFilterRef(field,search).valueChanges();
  }

  @action
  async fetchTag(){
    this.process=true;
    const docs=await this.ds.tagRef().get().toPromise();
    this.process = false;
    return pushToArray(docs)
  }

  @action
  fetchData(id:string) {
    this.loading = true;
    this.ds.subscriberTypesRef(id).valueChanges().subscribe(docs => {
      this.data = docs;
      this.empty = docs.length === 0;
      this.loading = false;
    });
  }

  @action
  addNew(item: any, callback) {
    this.process = true;
    this.ds.subscriberRef().doc(item.key).set(item).then(() => {
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  update(ref: AngularFirestoreCollection, item: any, callback) {
    this.process = true;
    ref.doc(item.key).update(item).then(() => {
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  delete(ref: AngularFirestoreCollection, item: any, callback) {
    this.process = true;
    ref.doc(item.key).delete().then(() => {
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  updateFileUrl(ref, item: any, fileName, fileUrl, callback) {
    this.process = true;
    ref.doc(item.key).update({
      fileName: fileName,
      fileUrl: fileUrl
    }).then(() => {
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  @action
  updateDocUrl(ref, item: any, docName, docUrl, callback) {
    this.process = true;
    ref.doc(item.key).update({
      docName: docName,
      docUrl: docUrl
    }).then(() => {
      this.process = false;
      callback(true, item)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    });
  }

  

}