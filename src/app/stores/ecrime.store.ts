import { ConvertService, toDayOfMonth, toMonthKh, toYearOfPeriod } from 'src/app/services/convert.service';
import { ApiService } from './../services/api.service';
import { observable, action } from "mobx";
import { Injectable } from "@angular/core";
import { toNumber } from 'functions/src/mapping';

@Injectable()
export class ECrime {
  @observable loading = true;
  @observable empty = false;
  @observable process = false;
  @observable data = [];

  @observable page: number = 1;
  @observable fromDateFilter: any = 0;
  @observable toDateFilter: any = 0;
  @observable public fromDate: Date = ConvertService.fromPeriodToDate(ConvertService.getDefaultDateReport(19).form_date);
  @observable public toDate: Date = new Date();
  @observable public periodText: string = null;
  @observable public categoryText = "បទល្មើសទាំងអស់";
  @observable public provinceText = "គ្រប់ខេត្តក្រុងទាំងអស់";

  @observable public provinceFilter=0;
  @observable public districtFilter=0;
  @observable public communeFilter=0;
  @observable public categoryFilter=0;
  @observable public subCategoryFilter=0;


  pageSize = 30;
  constructor(public api: ApiService) { }


  getPeriod(formDate, toDate) {
    this.fromDate = ConvertService.fromPeriodToDate(formDate);
    this.toDate = ConvertService.fromPeriodToDate(toDate);
    this.periodText = `ចាប់ពីថ្ងៃទី ${toDayOfMonth(this.fromDate)} ខែ${toMonthKh(this.fromDate)}, ${toYearOfPeriod(this.toDate)} ដល់ ${toDayOfMonth(this.toDate)} ខែ${toMonthKh(this.toDate)}, ${toYearOfPeriod(this.toDate)}`
  }

  @action
  fetchData(fromDate: string, toDate: string) {
    this.loading = true;
    this.getPeriod(fromDate, toDate)
    this.fromDateFilter = fromDate;
    this.toDateFilter = toDate;
    this.api.get(`${this.api.baseUri}listCrime?fromDate=${fromDate}&toDate=${toDate}&provinceId=${toNumber(this.provinceFilter)}&districtId=${this.districtFilter}&communeId=${this.communeFilter}&category=${this.categoryFilter}&subCategory=${this.subCategoryFilter}&page=${this.page}&perPage=${this.pageSize}`)
    .then((res) => {
      this.data = res;
      this.page=this.page+1;
      this.loading=false;
    })
    
  }

}
