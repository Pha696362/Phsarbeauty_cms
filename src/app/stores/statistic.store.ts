import { ConvertService, toMonthKh, toDayOfMonth, toYearOfPeriod, sum } from 'src/app/services/convert.service';
import { DataService } from "./../services/data.service";
import { observable, computed, action, autorun, toJS } from "mobx";
import { Injectable } from "@angular/core";
import { pushToArray } from '../services/utils.lib';
import { ApiService } from '../services/api.service';
import { periodData } from '../dummy/report';
import { toNumber } from 'functions/src/mapping';

@Injectable()
export class Statistic {
  @observable public data = null;
  @observable public region = null;
  @observable public category = null;
  @observable public subCategory = null;
  @observable public victim = null;
  @observable public suspect = null;
  @observable public groupPerson = null;
  @observable public loading = true;
  @observable public loadingRecent = false;
  @observable public empty = false;
  @observable public statisticByCategory: any = [];
  @observable public statisticBySubCategory: any = [];
  @observable public statisticByZone: any = [];
  @observable public statisticByVictim: any = [];
  @observable public statisticBySuspect: any = [];
  @observable public statisticByJustice: any = [];
  @observable public statisticByAllJustice: any = [];
  @observable public statisticByAllCrime: any = [];
  @observable public provinces: any = [];


  @observable public totalJustice: number = 0;
  @observable public totalCategory: number = 0;
  @observable public totalVictim: number = 0;
  @observable public totalSuspect: number = 0;
  @observable public periodOption = periodData[0];
  @observable public fromDate: Date = ConvertService.fromPeriodToDate(ConvertService.getDefaultDateReport(19).form_date);
  @observable public toDate: Date = new Date();
  @observable public periodText: string = null;
  @observable public provinceText = "គ្រប់ខេត្តក្រុងទាំងអស់";
  @observable public categoryText = "បទល្មើសទាំងអស់";
  @observable public subCategoryText = "ប្រភេទបទល្មើសទាំងអស់";

  @observable public provinceFilter = 0;
  @observable public categoryFilter = 0;
  @observable public subCategoryFilter = 0;
  @observable public fromDateFilter: any = 0;
  @observable public toDateFilter: any = 0;

  @observable public selectedProvince: any = null;
  @observable public selectedCategory: any = null;
  @observable public selectedSubCategory: any = null;

  @observable public totalAllJustice: number = 0;
  @observable public totalAllJusticePending: number = 0;
  @observable public totalAllJusticeCompleted: number = 0;
  @observable public totalAllCrime: number = 0;


  @observable public statisticCategory: any = [];
  @observable public statisticSubCategory: any = [];

  constructor(private ds: DataService, public api: ApiService) { }

  @action
  fetchRecent() {
    this.loadingRecent = true;
    this.ds.crimeRecentRef().valueChanges().subscribe(docs => {
      this.data = docs;
      this.loadingRecent = false;
    })
  }

  getPeriod(formDate, toDate) {
    this.fromDate = ConvertService.fromPeriodToDate(formDate);
    this.toDate = ConvertService.fromPeriodToDate(toDate);
    this.periodText = `ចាប់ពីថ្ងៃទី ${toDayOfMonth(this.fromDate)} ខែ${toMonthKh(this.fromDate)}, ${toYearOfPeriod(this.toDate)} ដល់ ${toDayOfMonth(this.toDate)} ខែ${toMonthKh(this.toDate)}, ${toYearOfPeriod(this.toDate)}`

  }

  @action
  fetchStatisticApi() {
    this.loading = true;
    this.getPeriod(this.fromDateFilter, this.toDateFilter);
    this.api.get(`${this.api.baseUri}statisticSummary?province=${toNumber(this.provinceFilter)}&fromDate=${this.fromDateFilter}&toDate=${this.toDateFilter}&category=${this.categoryFilter}&subCategory=${this.subCategoryFilter}`).then((res) => {
      const zoneStatistic = res.filter(m => m.LineType === "1");
      this.statisticByZone = zoneStatistic.map(m => ({ name: m.Name, value: m.Total, key: m.Id }));
      const SubCategoryStatistic = res.filter(m => m.LineType === "2");
      this.statisticBySubCategory = SubCategoryStatistic.map(m => ({ name: `${m.Name}: ${m.Total} ករណី`, value: m.Total, key: m.Id }));
      this.statisticSubCategory = SubCategoryStatistic.map(m => ({ name: `${m.Name}`, value: m.Total, key: m.Id }));
      const categoryStatistic = res.filter(m => m.LineType === "3");
      this.statisticByCategory = categoryStatistic.map(m => ({ name: `${m.Name}: ${m.Total} ករណី`, value: m.Total, key: m.Id }));
      const justiceStatistic = res.filter(m => m.Id === "1033" || m.Id === "1032");
      this.statisticByJustice = justiceStatistic.map(m => ({ name: `${m.Name}: ${m.Total}`, value: m.Total, key: m.Id }));;
      this.totalJustice = sum(this.statisticByJustice, "value");
      this.totalCategory = sum(this.statisticByCategory, "value");
      const allJusticeStatistic = res.filter(m => m.Id === "1035" || m.Id === "1036");
      this.statisticByAllJustice = allJusticeStatistic.map(m => ({ name: `${m.Name}: ${m.Total}`, value: m.Total, key: m.Id }));;
      this.totalAllJustice = sum(this.statisticByAllJustice, "value");
      const allCrimeStatistic = res.filter(m => m.Id === "1037" || m.Id === "1038");
      this.statisticByAllCrime = allCrimeStatistic.map(m => ({ name: `${m.Name}: ${m.Total}`, value: m.Total, key: m.Id }));;
      this.totalAllCrime = sum(this.statisticByAllCrime, "value");
      this.statisticCategory = categoryStatistic.map(m => ({ name: `${m.Name}`, value: m.Total, key: m.Id }));
      const vicTimStatistic = res.filter(m => m.LineType === "4" || m.LineType === "5" || m.LineType === "6");
      this.statisticByVictim = vicTimStatistic.map(m => ({ name: `${m.Name} ឆ្នាំ`, value: m.Total }));
      const suspectStatistic = res.filter(m => m.LineType === "7" || m.LineType === "8" || m.LineType === "9");
      this.statisticBySuspect = suspectStatistic.map(m => ({ name: `${m.Name} ឆ្នាំ`, value: m.Total }));
      this.totalSuspect = sum(this.statisticBySuspect, "value");
      this.totalVictim = sum(this.statisticByVictim, "value");
      const zoneListing = res.filter(m => m.LineType === "13");
      this.provinces = zoneListing.map(m => ({ name: m.Name, value: m.Total, key: m.Id }));
      const selectedPro = this.provinces.filter(m => toNumber(m.key) === this.provinceFilter);
      const selectedCat = this.statisticCategory.filter(m => toNumber(m.key) === this.categoryFilter);
      const selectedSubCat = this.statisticSubCategory.filter(m => toNumber(m.key) === this.subCategoryFilter);
      this.provinceText = selectedPro.length > 0 ? `ខេត្ត${selectedPro[0].name}` : `គ្រប់ខេត្តក្រុងទាំងអស់`;
      this.selectedProvince = selectedPro.length === 0 ? null : selectedPro[0];
      this.categoryText = selectedCat.length > 0 ? `${selectedCat[0].name}` : `បទល្មើសទាំងអស់`;
      this.selectedCategory = selectedCat.length === 0 ? null : selectedCat[0];
      this.subCategoryText = selectedSubCat.length > 0 ? `${selectedSubCat[0].name}` : `ប្រភេទបទល្មើសទាំងអស់`;
      this.selectedSubCategory = selectedSubCat.length === 0 ? null : selectedSubCat[0];

      this.loading = false;
    })
  }

  @action
  async fetchStatistic(year, fromMonth, toMonth) {
    this.loading = true;
    const geo = await this.ds.provincesRef().get().toPromise();
    const subCategoryDocs = await this.ds.subCategorykeyRef().get().toPromise();
    const categoryDocs = await this.ds.categoryRef().get().toPromise();
    // const announcementDocs = await crimeRef()
    //   .where("public", "==", true)
    //   .where("status.key", "<", crimeStatus.completed.key)
    //   .orderBy("status.key")
    //   .orderBy("page_key").get();

    // this.announcements = pushToArray(announcementDocs);

    const subCategoryData = pushToArray(subCategoryDocs);
    const categoryData = pushToArray(categoryDocs);

    // if (this.announcements.length >= Apps.Size) {
    //   this.lastVisible = this.announcements[this.announcements.length - 1];
    //   this.done = false;
    // }
    // else {
    //   this.done = true;
    //   this.lastVisible = null;
    // }

    const geoData = pushToArray(geo).sort((n1: any, n2: any) => ConvertService.toNumber(n1.code) - ConvertService.toNumber(n2.code));
    this.ds.crimeStatisticDataRef(year, fromMonth, toMonth).valueChanges().subscribe(snapshot => {

      // const series = categoryData.map((item: any) => {
      //   let total = 0;
      //   snapshot.forEach((m: any) => {
      //     const { categories } = m;
      //     if (categories && categories.length > 0) {
      //       const items = categories.filter((m: { key: any; }) => m.key === item.key);
      //       total = total + (items.length === 0 ? 0 : items[0].value);
      //     }
      //   })
      //   return ({ name: `${item.name}: ${total} ករណី`, value: total, key: item.key })
      // });
      // this.statisticByCategory = series;
      // const subCategories = subCategoryData.map((item: any) => {
      //   let totalSubCategory = 0;
      //   snapshot.forEach((m: any) => {
      //     const { sub_categories } = m;
      //     if (sub_categories && sub_categories.length > 0) {
      //       const items = sub_categories.filter((m: { key: any; }) => m.key === item.key);
      //       totalSubCategory = totalSubCategory + (items.length === 0 ? 0 : items[0].value);
      //     }
      //   })
      //   return ({ name: `${item.name}: ${totalSubCategory} ករណី`, value: totalSubCategory, key: item.key })
      // });

      // this.statisticBySubCategory = subCategories.filter(m => m.value !== 0);

      //by provinces
      // this.statisticByZone = geoData.map((item: any) => {
      //   let total = 0;
      //   snapshot.forEach((m: any) => {
      //     const { provinces } = m;
      //     if (provinces && provinces.length > 0) {
      //       const items = provinces.filter((m: { key: any; }) => m.key === item.key);
      //       total = total + (items.length === 0 ? 0 : items[0].value);
      //     }
      //   })
      //   return ({ name: item.name, value: total, key: item.key })
      // });


      // if (snapshot.length === 0) {
      //   this.statisticByVictim = []// this.data.filter((m: any) => m.type.key === 2);
      // }
      // else {
      //   this.statisticByVictim = [];
      //   this.statisticByVictim = [
      //     { name: ">=18", value: -100 },
      //     { name: ">=14និង<18", value: -10 },
      //     { name: "<14ឆ្នាំ", value: -5 },
      //   ]
      //   this.statisticBySuspect = [
      //     { name: ">=18", value: 20 },
      //     { name: ">=14និង<18", value: 15 },
      //     { name: "<14", value: 10 },
      //   ]
      // }
      this.loading = false;
    });
  }

}
