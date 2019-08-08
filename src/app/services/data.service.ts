import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private db: AngularFirestore) { }

  userRef() {
    return this.db.collection("users");
  }

  userDocRef(key: string) {
    return this.db.collection("users").doc<any>(key);
  }

  environmentRef() {
    return this.db.collection("crime_environment").doc("crime_environment");
  }

  sysConfigRef() {
    return this.db.collection("sys_config").doc("settings");
  }

  environmentFireRef() {
    return this.firestore().collection("crime_environment").doc("crime_environment");
  }

  batch() {
    return this.db.firestore.batch();
  }

  firestore() {
    return this.db.firestore;
  }

  createId() {
    return this.db.createId();
  }
}

export const reportFilterBy = [
  { key: 1, text: "Custom" },
  { key: 2, text: "Today" },
  { key: 3, text: "This Month" },
  { key: 4, text: "This Year" }
];

export const searchFilterBy = [
  { key: "crime_no", text: "Books" },
];
