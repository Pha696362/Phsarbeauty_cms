import { FormGroup } from '@angular/forms';
import { AuthService } from "./../auth/auth.service";
import { observable, computed, action, autorun, toJS } from "mobx";
import { Injectable } from "@angular/core";
import { DataService } from "../services/data.service";
import { Router } from '@angular/router';
import { ApiService, Utils } from '../services/api.service';
import { MappingService } from '../services/mapping.service';

@Injectable()
export class AddCrimeStore {
  @observable public loading = false;
  @observable public process = false;
  @observable public data = null;
  @observable public case1 = null;
  @observable public case2 = null;
  @observable public cause = null;
  @observable public causeLast = null;
  @observable public location = null;
  @observable public locationLast = null;
  @observable public place = null;
  @observable public toolboxLast = null;
  @observable public toolbox = null;
  @observable public weaponLast = null;
  @observable public weapon = null;
  @observable public transportTypeLast = null;
  @observable public transportType = null;
  @observable public communeId:string=null;
  @observable public crimeId:string=null;

  constructor(
    private ds: DataService,
    private router: Router,
    private auth: AuthService,
    private api: ApiService,

  ) {
  }

  @action
  addCrimeConfig(callback) {
    this.loading = true;
    this.api.get(`${this.api.baseUri}addCrimeConfig`).then((res) => {
      this.case1 = MappingService.orderBy(res.case.filter(m => m.OffenceId === "100"), "Id");
      this.case2 = MappingService.orderBy(res.case.filter(m => m.OffenceId === "200"), "Id");
      this.causeLast = res.cause.pop();
      this.cause = MappingService.orderBy(res.cause.filter(m => m.Id !== this.causeLast.Id), "Id");
      this.locationLast = res.location.pop();
      this.location = MappingService.orderBy(res.location.filter(m => m.Id !== this.locationLast.Id), "Id");
      this.place = MappingService.orderBy(res.place, "Id");
      this.toolboxLast = res.toolbox.pop();
      this.toolbox = MappingService.orderBy(res.toolbox.filter(m => m.Id !== this.toolboxLast.Id), "Id");
      this.weaponLast = res.weapon.pop();
      this.weapon = MappingService.orderBy(res.weapon.filter(m => m.Id !== this.weaponLast.Id), "Id");
      this.transportTypeLast = res.transportType.pop();
      this.transportType = MappingService.orderBy(res.transportType.filter(m => m.Id !== this.transportTypeLast.Id), "Id");
      this.loading = false;
      callback(res)
    })
  }

  async fetchVillageByCommune(communeKey: string, callback) {
    const villageData = await this.ds.villageRef(communeKey).get().toPromise();
    const villageDocs = MappingService.orderBy(MappingService.pushToArray(villageData), "id")
    callback(villageDocs);
  }

  @action
  addCrime(f: any, callback){
    // this.loading = true;
    this.api.post(`${this.api.baseUri}addCrime`, f).then(res=>{
      // this.loading = false;
      callback(true, null);
    }).catch(error=>{
      // this.loading = false;
      callback(true, error);
    })
  }

}
