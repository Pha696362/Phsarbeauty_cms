import { ApiService } from './../services/api.service';
import { observable, action } from "mobx";
import { Injectable } from "@angular/core";

@Injectable()
export class GeoData {
  @observable loading = true;
  @observable empty = false;
  @observable process = false;
  @observable provinces = [];
  @observable districts = [];
  @observable communes = [];

  @observable selectedProvince:any=null;
  @observable selectedDistrict:any=null;
  @observable selectedCommune:any=null;
  @observable locationText="គ្រប់ខេត្តក្រុងទាំងអស់";
  @observable crimeGeo=null;

  constructor(public api: ApiService) { }

  @action
  async fetchData(uid: string) {
    this.loading = true;
    const provinces = await this.api.get(`${this.api.baseUri}selectProvince`);
    this.selectedProvince=provinces.length>0?provinces[0]:null;
    this.provinces = provinces;
    if(this.selectedProvince){
      const districts = await this.api.get(`${this.api.baseUri}selectDistrict?id=${this.selectedProvince.Id}`);
      this.districts=districts;
      this.selectedDistrict=districts.length>0?districts[0]:null;
    }
    if(this.selectedDistrict){
      const communes = await this.api.get(`${this.api.baseUri}selectCommune?id=${this.selectedDistrict.Id}`);
      this.communes=communes;
      this.selectedCommune=communes.length>0?communes[0]:null;
    }
    this.locationText=`${this.selectedProvince.Name} / ${this.selectedDistrict.Name} / ${this.selectedCommune.Name}`;
    this.crimeGeo=`បញ្ជាក់ទីតាំង ${this.selectedProvince.Name} / ${this.selectedDistrict.Name} / ${this.selectedCommune.Name}`
    this.loading = false;
  }

}
