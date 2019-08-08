import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-crime-filter-category',
  templateUrl: './crime-filter-category.component.html',
  styleUrls: ['./crime-filter-category.component.scss']
})
export class CrimeFilterCategoryComponent implements OnInit {
  @Input() categories: any;
  @Input() subCategories: any;
  
  category = new FormControl();
  subCategory = new FormControl();

  constructor() { }

  ngOnInit() {
  }

  _onApply(){
    
  }


  compareWith(o1: any, o2: any){
    if(o1 && o2) return o1.Id===o2.Id;
    return false;
  }

}
