import { DataService } from "./../services/data.service";
import { observable, computed, action, autorun, toJS } from "mobx";
import { Injectable } from "@angular/core";
import { AuthService } from '../auth/auth.service';
import { IUser } from '../interfaces/user';

@Injectable()
export class Environment {
  @observable users = null;
  @observable sysConfig = null;
  @observable role = null;
  @observable province = null;
  @observable option = null;
  @observable config = null;
  @observable loading = false;
  @observable process = false;
  @observable data = [];
  @observable empty = false;
  @observable isAdmin = false;
  @observable isReadOnly = false;
  @observable isReadWrite = false;

  constructor(
    private ds: DataService,
    private auth: AuthService
  ) {
    this.fetchCanActive();
  }

  @action
  fetchEnvironment() {
    this.loading = true;
    this.ds.environmentRef().valueChanges().subscribe(doc => {
      this.option = doc;
      this.loading = false;
    });
  }

  @action
  fetchSysConfig(callback) {
    this.ds.sysConfigRef().valueChanges().subscribe(doc => {
      this.sysConfig = doc;
      callback(doc)
    });
  }

  @action
  fetchEnvironmentArray(callback) {
    this.loading = true;
    this.ds.environmentRef().valueChanges().subscribe(doc => {
      this.option = doc;
      this.loading = false;
      callback(doc)
    });
  }

  @action
  fetchUser(key) {
    this.loading = true;
    this.ds.userRef().doc<any>(key).valueChanges().subscribe(doc => {
      if (doc) {
        const { role, province } = doc;
        this.users = doc;
        this.province = province;
        this.role = role;
      }
      this.loading = false;
    });
  }

  @action
  fetchUserDoc(callback) {
    this.loading = true;
    this.users = null;
    this.auth.canActiveRef().subscribe(users => {
      if (users) {
        // this.users = {
        //   key: users.uid,
        //   name: users.displayName ? users.displayName : "Unknown",
        //   email: users.email,
        // }ƒ
        const { uid } = users;
        this.ds.userRef().doc<any>(uid).valueChanges().subscribe(doc => {
          // const { role, province } = doc;
          // this.users = doc;
          // this.province = province;
          // this.role = role;
          this.loading = false;
          callback(this.users)
        });
      }
    });
  }

  @action
  fetchCanActive() {
    this.loading = true;
    this.auth.canActiveRef().subscribe(users => {
      if (users) {
        this.ds.userRef().doc<any>(users.uid).valueChanges().subscribe(doc => {
          this.users = doc;
          this.loading = false;
        });
      }
      this.loading = false;
    })
  }

  @action
  fetchData() {
    this.loading = true;
    this.ds.userRef().valueChanges().subscribe(docs => {
      this.data = docs;
      this.empty = docs.length === 0;
      this.loading = false;
    })
  }

  @action
  addUser(users: IUser, callback) {
    this.process = true;
    this.ds.userRef().doc(users.key).set(users).then(() => {
      this.process = false;
      callback(true, null)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    })
  }

  @action
  updateUser(users: IUser, callback) {
    this.process = true;
    this.ds.userRef().doc(users.key).update(users).then(() => {
      this.process = false;
      callback(true, null)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    })
  }

  @action
  deleteUser(users: IUser, callback) {
    this.process = true;
    this.ds.userRef().doc(users.key).delete().then(() => {
      this.process = false;
      callback(true, null)
    }).catch(error => {
      this.process = false;
      callback(false, error)
    })
  }

}
