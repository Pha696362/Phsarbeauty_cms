import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Statistic } from 'src/app/stores/statistic.store';
import { Router } from '@angular/router';
import { toNumber } from 'functions/src/mapping';

@Component({
  selector: 'app-statistic-sub-category',
  templateUrl: './statistic-sub-category.component.html',
  styleUrls: ['./statistic-sub-category.component.scss']
})
export class StatisticSubCategoryComponent implements OnInit {
  @Input() data:any;
  @Output() menuClosed: EventEmitter<void>;

  constructor(public statistic:Statistic,
    public router:Router) { }

  ngOnInit() {}

  defaultPeriod(){
    const {categoryFilter,subCategoryFilter,fromDateFilter,toDateFilter,provinceFilter}=this.statistic;
    this.router.navigate([`/${fromDateFilter}/${toDateFilter}/${toNumber(provinceFilter)}/${toNumber(categoryFilter)}/${0}`])
  }

  changePeriod(event){
    const {key}=event.value;
    this.statistic.selectedSubCategory=event.value;
    const {categoryFilter,provinceFilter,fromDateFilter,toDateFilter}=this.statistic;
    this.menuClosed.closed;
    this.router.navigate([`/${fromDateFilter}/${toDateFilter}/${toNumber(provinceFilter)}/${toNumber(categoryFilter)}/${key}`]);
  }

}
