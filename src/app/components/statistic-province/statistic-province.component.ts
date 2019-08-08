import { toNumber } from 'functions/src/mapping';
import { FormControl } from '@angular/forms';
import { Statistic } from './../../stores/statistic.store';
import { Component, OnInit, Input, Output } from '@angular/core';
import { periodData } from 'src/app/dummy/report';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-statistic-province',
  templateUrl: './statistic-province.component.html',
  styleUrls: ['./statistic-province.component.scss']
})
export class StatisticProvinceComponent implements OnInit {
  @Input() data:any;
  @Input() selected:any;
  province=new FormControl();
  periodData=periodData;
  constructor(public statistic:Statistic,
    public router:Router
    ) { }

  ngOnInit() {
    
  }

  defaultPeriod(){
    const {categoryFilter,subCategoryFilter,fromDateFilter,toDateFilter}=this.statistic;
    this.router.navigate([`/${fromDateFilter}/${toDateFilter}/${0}/${toNumber(categoryFilter)}/${toNumber(subCategoryFilter)}/`])
  }

  changePeriod(event){
    const {key}=event.value;
    this.statistic.selectedProvince=event.value;
    const {categoryFilter,subCategoryFilter,fromDateFilter,toDateFilter}=this.statistic;
    this.router.navigate([`/${fromDateFilter}/${toDateFilter}/${key}/${toNumber(categoryFilter)}/${toNumber(subCategoryFilter)}/`])
  }
}
