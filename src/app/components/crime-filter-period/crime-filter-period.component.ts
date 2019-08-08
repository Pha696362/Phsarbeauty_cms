import { Environment } from './../../stores/environment.store';
import { days, monthOfYear } from './../../dummy/report';
import { FormControl, Validators } from '@angular/forms';
import { Statistic } from './../../stores/statistic.store';
import { Component, OnInit, Input } from '@angular/core';
import { periodData } from 'src/app/dummy/report';
import { toMonthKh, toYearOfPeriod, toDayOfMonth,toMonthOfYear, getDateReport } from 'src/app/services/convert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crime-filter-period',
  templateUrl: './crime-filter-period.component.html',
  styleUrls: ['./crime-filter-period.component.scss']
})
export class CrimeFilterPeriodComponent implements OnInit {
  @Input() fromDate:Date;
  @Input() toDate:Date;
  
  periodData=periodData;
  periodOption=new FormControl(this.periodData[0],Validators.required);
  dayOfPeriod=new FormControl(20,Validators.required);
  monthOfPeriod=new FormControl(toMonthKh(new Date()),Validators.required);
  yearOfPeriod=new FormControl(toYearOfPeriod(new Date()),Validators.required);
  toDayOfPeriod=new FormControl(20,Validators.required);
  toMonthOfPeriod=new FormControl(toMonthKh(new Date()),Validators.required);
  toYearOfPeriod=new FormControl(toYearOfPeriod(new Date()),Validators.required);
  
  days=days;
  months=monthOfYear;
  years=[];
  constructor(public statistic:Statistic,
    public env: Environment,
    private router:Router
    ) { }

  ngOnInit() {
    for (let index = 2000; index < 2050; index++) {this.years.push(`${index}`)}
    const selectedMonth=this.months.filter(m=>m.key===toMonthOfYear(this.fromDate))[0];
    const selectedYear=this.years.filter(m=>m===toYearOfPeriod(this.fromDate))[0];
    this.dayOfPeriod.patchValue(this.days.filter(m=>m.key===toDayOfMonth(this.fromDate))[0])
    this.monthOfPeriod.patchValue(selectedMonth)
    this.yearOfPeriod.patchValue(selectedYear)
    const toSelectedMonth=this.months.filter(m=>m.key===toMonthOfYear(this.toDate))[0];
    const toSelectedYear=this.years.filter(m=>m===toYearOfPeriod(this.toDate))[0];
    this.toDayOfPeriod.patchValue(this.days.filter(m=>m.key===toDayOfMonth(this.toDate))[0])

    this.toMonthOfPeriod.patchValue(toSelectedMonth)
    this.toYearOfPeriod.patchValue(toSelectedYear)
    this.dayOfPeriod.disable();
    this.monthOfPeriod.disable();
    this.yearOfPeriod.disable();
    this.toDayOfPeriod.disable();
    this.toMonthOfPeriod.disable();
    this.toYearOfPeriod.disable();
  }
  
  compareWith(o1: any, o2: any){
    if(o1 && o2) return o1.key===o2.key;
    return false;
  }

  compareWithYear(o1: any, o2: any){
    if(o1 && o2) return o1===o2;
    return false;
  }

  defaultPeriod(){

  }

  _onApply(){
    const { endDayOfMonth } = this.env.sysConfig;
    const {value}=this.periodOption;
    let period:any;
    if(value.key<5){
      period=getDateReport(value.key,endDayOfMonth);
    }
    const {fromDate,toDate}=period;
    const {categoryFilter,provinceFilter,subCategoryFilter}=this.statistic;
    this.router.navigate([`/${fromDate}/${toDate}/${provinceFilter}/${categoryFilter}/${subCategoryFilter}/`])
  }

  changePeriod(event){
    const {value}=event;
    const { endDayOfMonth } = this.env.sysConfig;
    const period=getDateReport(value.key,endDayOfMonth);
  }

}
