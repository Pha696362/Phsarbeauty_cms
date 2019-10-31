import { ConvertService, toNearExpiredDate } from './convert.service';
import { ITag, IGenre, ISlide, IBook, ICategory, ICourse, IAbout, ITypes, IContent, IAdvertise, ITvnews, IEmbulance, IFiretruck, IPhonenumber } from './../interfaces/bookstore';
import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { IProduct, ISubscriber } from '../interfaces/subscriber';

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private db: AngularFirestore) { }

  baseDocRef(col: string) {
    return this.db.collection(`${col}`);
  }

  userRef() {
    return this.db.collection("user");
  }

  userDocRef(key: string) {
    return this.db.collection("user").doc<any>(key);
  }

  environmentRef() {
    return this.db.collection("crime_environment").doc("crime_environment");
  }

  sysConfigRef() {
    return this.db.collection("sys_config").doc("settings");
  }

  tagRef() {
    return this.db.collection<ITag>("tags", ref => ref.orderBy("name"));
  }
  

  aboutRef() {
    return this.db.collection<IAbout>("about", ref => ref.orderBy("name"));
  }
  phonenumberRef() {
    return this.db.collection<IPhonenumber>("phonenumber", ref => ref.orderBy("name"));
  }
  embulanceRef() {
    return this.db.collection<IEmbulance>("embulance", ref => ref.orderBy("name"));
  }
  firetruckRef() {
    return this.db.collection<IFiretruck>("firetruck", ref => ref.orderBy("name"));
  }

  categoryRef() {
    return this.db.collection<ICategory>("category", ref => ref.orderBy("name"));
  }

  
 


  tagValidRef(keyword: string) {
    return this.db.collection<ITag>("tags", ref => ref.where("name", "==", keyword));
  }

  genreRef() {
    return this.db.collection<IGenre>("genres", ref => ref.orderBy("name"));
  }

  genreValidRef(keyword: string) {
    return this.db.collection<IGenre>("genres", ref => ref.where("name", "==", keyword));
  }


  slideRef() {
    return this.db.collection<ISlide>("slides", ref => ref.orderBy("order"));
  }

  advertiseRef() {
    return this.db.collection<IAdvertise>("advertise", ref => ref.orderBy("name"));
  }

  bookRef() {
    return this.db.collection<IBook>("books", ref => ref.orderBy("title"));
  }

  productRef() {
    return this.db.collection<IProduct>("products", ref => ref.orderBy("period"));
  }

  subscriberTypesRef(id: string) {
    switch (id) {
      case 'approval_accounts':
        return this.db.collection<ISubscriber>("subscribers", ref => ref
          .where("isPaid", "==", false)
          .where("product.period", ">", 0)
          .orderBy("product.period")
          .orderBy("page_key"));
      case 'membership':
        return this.db.collection<ISubscriber>("subscribers", ref => ref
          .where("isPaid", "==", true)
          .where("product.period", ">", 0)
          .orderBy("product.period")
          .orderBy("page_key"));
      case 'expired':
        const expiredDateKey = ConvertService.toDateKey(new Date())
        return this.db.collection<ISubscriber>("subscribers", ref => ref
          .where("isPaid", "==", true)
          .where("expiredDateKey", "<", expiredDateKey)
          .orderBy("expiredDateKey")
          .orderBy("page_key"));
      case 'near-expire':
        const nearExpiredDateKey = ConvertService.toDateKey(toNearExpiredDate())
        return this.db.collection<ISubscriber>("subscribers", ref => ref
          .where("isPaid", "==", true)
          .where("expiredDateKey", "<", nearExpiredDateKey)
          .orderBy("expiredDateKey")
          .orderBy("page_key"));
      case 'approval':
        return this.db.collection<ISubscriber>("subscribers", ref => ref
          .where("isPaid", "==", false)
          .where("product", "==", null)
          .orderBy("page_key"));

      default:
        return this.db.collection<ISubscriber>("subscribers", ref => ref.orderBy("page_key"));
    }
  }

  settingFireStore() {
    return this.firestore().collection("options").doc("general");
  }

  sysSetting() {
    return this.db.collection("options").doc("general");
  }

  subscriberFireRef() {
    return this.firestore().collection("subscribers");
  }

  invoiceFireRef() {
    return this.firestore().collection("invoices");
  }

  subscriberRef() {
    return this.db.collection<ISubscriber>("subscribers", ref => ref.orderBy("page_key"));
  }

  subscriberSearchRef(field) {
    return this.db.collection("subscribers", ref => ref.orderBy(field, "desc")
      .limit(20)
    );
  }

  subscriberFilterRef(field: string, text: any) {
    let search = text;
    if(field === "phone") search = `+855${ConvertService.toNumber(search)}`
    if (search) {
      if (search.key) {
        return this.db.collection("subscribers", ref =>
          ref
            .where("phoneNumber", ">=", search.key)
            .orderBy(field)
            .limit(20)
        );
      }
      return this.db.collection("subscribers", ref =>
        ref
          .where(field, ">=", search)
          .orderBy(field)
          .limit(20)
      );
    }
    return this.db.collection("subscribers", ref =>
      ref
        .orderBy(field, "desc")
        .limit(20)
    );

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

  typenewsRef() {
    return this.db.collection<ITypes>("types", ref => ref.orderBy("name"));
  }
  tvnewsRef() {
    return this.db.collection<ITvnews>("tvnews", ref => ref.orderBy("name"));
  }
  contentRef() {
    return this.db.collection<IContent>("content", ref => ref.orderBy("name"));
  }
  entertainmentRef() {
    return this.db.collection<ITvnews>("tvnews", ref => ref.orderBy("name"));
  }

flileFolderRef() {
  return this.db.collection('file_folder');
}
flileRef() {
  return this.db.collection('file_manager');
}
AdvertiseFolderRef() {
  return this.db.collection('advertise_folder');
}
advertisementRef() {
  return this.db.collection('advertise_manager');
}
}

