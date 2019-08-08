import { FormControl, Validators } from '@angular/forms';
import { GeoData } from './../../stores/geoData.store';
import { ConvertService } from 'src/app/services/convert.service';
import { Environment } from 'src/app/stores/environment.store';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { toNumber } from 'functions/src/mapping';
import { ECrime } from 'src/app/stores/ecrime.store';

@Component({
  selector: 'app-crime',
  templateUrl: './crime.component.html',
  styleUrls: ['./crime.component.scss']
})
export class CrimeComponent implements OnInit {
  endDayOfMonth: any;

  constructor(
    private router: Router,
    public env: Environment,
    public store: ECrime,
    public geo: GeoData,
    public route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    await this.getList();
    await this.geo.fetchData('');
    
  }

  async getList() {
    this.env.fetchSysConfig((res) => {
      const { endDayOfMonth } = this.env.sysConfig;
      this.endDayOfMonth = endDayOfMonth;
      this.route.params.forEach(param => {
        if (param) {
          const { provinceId, categoryId, subCategoryId, fromDate, toDate } = param;
          this.store.provinceFilter = toNumber(provinceId);
          this.store.categoryFilter = toNumber(categoryId);
          this.store.subCategoryFilter = toNumber(subCategoryId);
        }
        else {
          this.store.provinceFilter = 0;
          this.store.categoryFilter = 0;
          this.store.subCategoryFilter = 0;
        }
        this.store.fetchData(
          ConvertService.getDefaultDateReport(endDayOfMonth).form_date,
          ConvertService.getDefaultDateReport(endDayOfMonth).to_date);
      })
    })
  }

  addNew() {
    this.router.navigate([`/crime/${this.geo.selectedCommune.Id}/draft`])
  }

}
