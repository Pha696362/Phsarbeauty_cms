import { toNumber } from 'functions/src/mapping';
import { Component, OnInit, Input } from '@angular/core';
import { Statistic } from 'src/app/stores/statistic.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistic-category',
  templateUrl: './statistic-category.component.html',
  styleUrls: ['./statistic-category.component.scss']
})
export class StatisticCategoryComponent implements OnInit {
@Input() data=[];
  constructor(public statistic:Statistic,
    public router:Router) { }

  ngOnInit() {
  }

  defaultPeriod(){
    const {categoryFilter,subCategoryFilter,fromDateFilter,toDateFilter,provinceFilter}=this.statistic;
    this.router.navigate([`/${fromDateFilter}/${toDateFilter}/${toNumber(provinceFilter)}/${0}/${toNumber(subCategoryFilter)}/`])
  }

  changePeriod(event){
    const {key}=event.value;
    this.statistic.selectedCategory=event.value;
    const {subCategoryFilter,provinceFilter,fromDateFilter,toDateFilter}=this.statistic;
    this.router.navigate([`/${fromDateFilter}/${toDateFilter}/${toNumber(provinceFilter)}/${key}/${toNumber(subCategoryFilter)}/`])
  }

}
