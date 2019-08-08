import { IGeo, IDistrict, ICommunes, IVillage } from "./../interfaces/geo";
import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { roleObj } from '../dummy/roles';
import { Pages } from '../dummy/pages';
import { CONFIGS } from '../dummy/stauts';

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private db: AngularFirestore) { }

  searchRef(field, value) {
    if (value) {
      if (value.key) {
        return this.db.collection<any>("crime", ref => ref
          .where("key", "==", value.key)
          .limit(15));
      }
      return this.db.collection<any>("crime", ref => ref
        .where(field, ">=", value)
        .orderBy(field)
        .orderBy("case_receive_date_key", "desc")
        .limit(15));
    }
    return this.db.collection<any>("crime", ref => ref.orderBy("case_receive_date_key", "desc").limit(15));
  }

  crimeRef() {
    return this.db.collection<any>("crime", ref => ref.orderBy("case_receive_date_key", "desc"));
  }

  crimeRecentRef() {
    return this.db.collection<any>("crime", ref => ref.orderBy("case_receive_date_key", "desc").limit(10));
  }

  crimeByCommuneRef(communeKey: string) {
    return this.db.collection<any>("crime", ref => ref
    .where('create_date_key', '>=', CONFIGS.FROM_DATE).where('create_date_key', '<=', CONFIGS.TO_DATE).where("commune.key","==",communeKey).orderBy("create_date_key","desc"));
  }

  crimeFailRef() {
    // return this.db.collection<any>("crime", ref => ref.where("has_evident", "==", false).orderBy("create_date", "desc").limit(180));
    return this.db.collection<any>("crime", ref => ref.orderBy("create_date", "desc").limit(Pages.size));
  }

  crimeByUserRef(user: any) {
    const { role, province } = user;
    switch (role.key) {
      case roleObj.administrator.key:
        return this.db.collection<any>("crime", ref => ref.orderBy("create_date", "desc").limit(Pages.size));
      default:
        return this.db.collection<any>("crime", ref => ref.where("province.key", "==", province.key).orderBy("create_date", "desc").limit(Pages.size));
    }
  }

  filterCrimeByUserRef(user: any, pro?: any, dis?: any, com?: any, cat?: any, subcat?: any, fromdate?: any, todate?: any) {
    const { role, province, key } = user;
    const sw = { pro, dis, com, cat, subcat };
    switch (role.key) {
      case roleObj.readWrite.key:
        let ref = this.firestore().collection("crime")
        if (fromdate && todate)
          ref.where('create_date_key', '>=', fromdate).where('create_date_key', '<=', todate)

        if (sw.pro)
          ref.where('province.key', '==', pro.key)

        if (sw.dis)
          ref.where('district.key', '==', dis.key)

        if (sw.com)
          ref.where('commune.key', '==', com.key)

        if (sw.cat)
          ref.where('category.key', '==', cat.key)

        if (sw.subcat)
          ref.where('sub_category.key', '==', subcat.key)

        return ref.limit(Pages.size);

      case roleObj.administrator.key:

        let ref2 = this.firestore().collection("crime")
        if (fromdate && todate)
          ref.where('create_date_key', '>=', fromdate).where('create_date_key', '<=', todate)

        if (sw.pro)
          ref.where('province.key', '==', pro.key)

        if (sw.dis)
          ref.where('district.key', '==', dis.key)

        if (sw.com)
          ref.where('commune.key', '==', com.key)

        if (sw.cat)
          ref.where('category.key', '==', cat.key)

        if (sw.subcat)
          ref.where('sub_category.key', '==', subcat.key)

        return ref2.limit(Pages.size);

      default:
        break;
    }
  }


  crimeSearchRef(field) {
    return this.db.collection<any>("crime", ref => ref.orderBy("page_key"));
  }

  crimeDocRef(key) {
    return this.db.collection("crime").doc(key);
  }

  crimeStatisticRef() {
    return this.db.collection("crime_statistic");
  }

  crimeStatisticDocsRef(yearKey, monthKey, status) {
    if (status === "All") {
      return this.db.collection("crime_statistic").doc(yearKey).collection("month").doc(monthKey).collection("statistic");
    } else {
      return this.db.collection("crime_statistic").doc(yearKey).collection("month").doc(monthKey).collection("statistic").doc(status).collection("province");
    }
  }

  crimeFireRef() {
    return this.firestore().collection("crime");
  }

  crimeTransferFireRef() {
    return this.firestore().collection("crime_transfer");
  }

  verdictRef() {
    return this.db.collection("verdict");
  }

  verdictFireRef() {
    return this.firestore().collection("verdict");
  }

  locationRef() {
    return this.db.collection<any>("location", ref => ref.orderBy("name"));
  }

  locationSceneRef() {
    return this.db.collection<any>("location-scene", ref => ref.orderBy("name"));
  }

  caseReasonRef() {
    return this.db.collection<any>("case-reason", ref => ref.orderBy("name"));
  }

  weaponRef() {
    return this.db.collection<any>("weapons", ref => ref.orderBy("name"));
  }

  transportationRef() {
    return this.db.collection<any>("transportation", ref => ref.orderBy("name"));
  }

  transportationOtherRef() {
    return this.db.collection<any>("other-transportation", ref => ref.orderBy("name"));
  }

  categoryRef() {
    return this.db.collection<any>("category", ref => ref.orderBy("name"));
  }

  personRef() {
    return this.db.collection("persons");
  }

  personFireRef() {
    return this.firestore().collection("persons");
  }

  personDocsRef(typeKey: number) {
    return this.db.collection("persons", ref => ref.where("person_type.key", "==", typeKey));
  }

  managementRef(collectionName) {
    return this.db.collection<any>(collectionName, ref => ref.orderBy("name"));
  }

  subCategoryRef(categoryKey?) {
    if (categoryKey)
      return this.db.collection<any>("sub-category", ref => ref.where("category.key", "==", categoryKey));
    else
      return this.db.collection<any>("sub-category")
  }

  crimeStatisticDataRef(year: any, fromMonth: any, toMonth: any) {
    return this.db.collection("crime_statistic")
      .doc(`${year}`)
      .collection("month", ref => ref
        .where("key", ">=", `${fromMonth}`)
        .where("key", "<=", `${toMonth}`)
        .orderBy("key"))
  }

  subCategorykeyRef() {
    return this.db.collection("sub-category");
  }

  districtRef(provinceKey?) {
    if (provinceKey)
      return this.db.collection<IDistrict>("geo_districts", ref =>
        ref.where("province.key", "==", provinceKey)
      );
    else return this.db.collection<IDistrict>("geo_districts");
  }

  communeRef(districtKey?) {
    if (districtKey)
      return this.db.collection<ICommunes>("geo_communes", ref =>
        ref.where("district.key", "==", districtKey)
      );
    else return this.db.collection<IDistrict>("geo_communes");
  }

  villageRef(communeKey?) {
    if (communeKey)
      return this.db.collection<IVillage>("geo_villages", ref =>
        ref.where("commune.key", "==", communeKey)
      );
    else return this.db.collection<IVillage>("geo_villages");
  }

  provincesRef() {
    return this.db.collection<IGeo>("geo_provinces", ref =>
      ref.orderBy("code")
    );
  }

  userRef() {
    return this.db.collection("users");
  }

  positionsRef() {
    return this.db.collection("positions");
  }

  titlesRef() {
    return this.db.collection("titles");
  }

  userByProvinceRef(provinceKey: string) {
    return this.db.collection<any>("users", ref => ref.where("province.key", "==", provinceKey));
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
  { key: "crime_no", text: "លេខបទល្មើស" },
  // { key: "full_name", text: "សាលក្រម" },
  // { key: "first_name", text: "នាម" }
  // { key: "last_name", text: "អ្នកប" },
  // { key: "mobile_phone", text: "Phone Number" }
];
