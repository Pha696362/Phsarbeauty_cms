import { Category } from './../../stores/category.store';
import { DeleteComponent } from './../../components/delete/delete.component';
import { caseCategoryLabels } from './../../dummy/label';
import { AddProvinceComponent } from './../../dialog/add-province/add-province.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-category',
  templateUrl: './case-category.component.html',
  styleUrls: ['./case-category.component.scss']
})
export class CaseCategoryComponent implements OnInit {
  tabs=tabs.caseCategory;
  labels=caseCategoryLabels;
  constructor(
    public store:Category,
    public router: Router,
    public env:Environment,
    private snackBar:MatSnackBar,
    public dialog:MatDialog) {}

  ngOnInit() {
    this.store.fetchDataApi();
  }

  create(){
    let dialogRef = this.dialog.open(AddProvinceComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }


  delete(item:any){
    // let dialogRef = this.dialog.open(DeleteComponent, {
    //   data: {title:'Delete Category',memo:'If this district is using in other list you cannot delete district.',name:item.name},
    //   width: '35vw',
    //   disableClose: true,
    //   role: 'dialog',
    // });
    // dialogRef.afterClosed().subscribe(result => { 
    //   if(result==='yes'){
    //     this.store.deleteProvince(item.key,(success,error)=>{
    //       if (success) {
    //         this.snackBar.open('Province has been deleted.', 'done', { duration: 2000 });
    //       }
    //       else {
    //         this.snackBar.open(error, 'Error')
    //       }
    //     })
    //   }
    // });
  }
}
