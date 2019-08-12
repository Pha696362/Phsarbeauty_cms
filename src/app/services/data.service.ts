import { ITag, IGenre, ISlide, IBook } from './../interfaces/bookstore';
import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private db: AngularFirestore) { }

  baseDocRef(col: string) {
    return this.db.collection(`${col}`);
  }

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

  tagRef() {
    return this.db.collection<ITag>("tags",ref=>ref.orderBy("name"));
  }

  tagValidRef(keyword:string) {
    return this.db.collection<ITag>("tags",ref=>ref.where("name","==",keyword));
  }

  genreRef() {
    return this.db.collection<IGenre>("genres",ref=>ref.orderBy("name"));
  }
  
  genreValidRef(keyword:string) {
    return this.db.collection<IGenre>("genres",ref=>ref.where("name","==",keyword));
  }


  slideRef() {
    return this.db.collection<ISlide>("slides",ref=>ref.orderBy("order"));
  }
  
  bookRef() {
    return this.db.collection<IBook>("books",ref=>ref.orderBy("title"));
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
