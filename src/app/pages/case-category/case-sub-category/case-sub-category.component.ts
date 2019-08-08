import { AddSubCategoryComponent } from './../../../dialog/add-sub-category/add-sub-category.component';
import { Category } from './../../../stores/category.store';
import { DeleteComponent } from './../../../components/delete/delete.component';
import { tabs } from './../../../dummy/tabs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-case-sub-category',
  templateUrl: './case-sub-category.component.html',
  styleUrls: ['./case-sub-category.component.scss']
})
export class CaseSubCategoryComponent implements OnInit {
  tabs = tabs.caseCategory;
  categoryKey: string;

  constructor(
    public store: Category,
    private snackBar:MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.store.fetchData()
    this.route.params.forEach(params => {
      this.categoryKey = params["id"];
      this.store.fetchSelectedCategoryApi(this.categoryKey);
      this.store.fetchSubCategoryApi(this.categoryKey);
      this.store.fetchDataApi();
    })
  }

  create() {
    let dialogRef = this.dialog.open(AddSubCategoryComponent, {
      data: this.categoryKey,
      panelClass: 'register-test-overlay-panel',
      width: '35vw',
      height: '100vh',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
    dialogRef.afterClosed().subscribe(result => { });
  }
  
  delete(item:any){
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: {title:'Delete District',memo:'If this district is using in other list you cannot delete district.',name:item.name},
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => { 
      if(result==='yes'){
        this.store.deleteSubCategory(item.key,(success,error)=>{
          if (success) {
            this.snackBar.open('District has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }


}