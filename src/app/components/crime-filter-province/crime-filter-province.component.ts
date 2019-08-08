import { days } from './../../dummy/report';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-crime-filter-province',
  templateUrl: './crime-filter-province.component.html',
  styleUrls: ['./crime-filter-province.component.scss']
})
export class CrimeFilterProvinceComponent implements OnInit {
  @Input() data:any;
  @Input() districts:any;
  @Input() communes:any;
  
  @Input() selectedProvince:any;
  @Input() selectedDistrict:any;
  @Input() selectedCommune:any;
  
  province = new FormControl(null, Validators.required);
  district = new FormControl(null, Validators.required);
  commune = new FormControl(null, Validators.required);

  
  days=days;
  constructor() { }

  ngOnInit() {
    this.province.patchValue(this.selectedProvince)
    this.district.patchValue(this.selectedDistrict)
    this.commune.patchValue(this.selectedCommune)
  }


  compareWith(o1: any, o2: any){
    if(o1 && o2) return o1.Id===o2.Id;
    return false;
  }

  _onApply(){

  }

  defaultPeriod(){

  }
}
