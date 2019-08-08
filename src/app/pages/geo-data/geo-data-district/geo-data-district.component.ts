import { AddDistrictComponent } from './../../../dialog/add-district/add-district.component';
import { Geo } from './../../../stores/geo.store';
import { DeleteComponent } from './../../../components/delete/delete.component';
import { tabs } from './../../../dummy/tabs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { IDistrict } from 'src/app/interfaces/geo';
import { EditDistrictComponent } from 'src/app/dialog/edit-district/edit-district.component';

@Component({
  selector: 'app-geo-data-district',
  templateUrl: './geo-data-district.component.html',
  styleUrls: ['./geo-data-district.component.scss']
})
export class GeoDataDistrictComponent implements OnInit {
  tabs = tabs.geo;
  provinceKey: string;

  dbName:any;

  constructor(
    public geo: Geo,
    private snackBar:MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.geo.fetchProvince()
    this.route.params.forEach(params => {
      this.provinceKey = params["id"];
      this.geo.fetchSelectedProvince(this.provinceKey)
      this.geo.fetchDistricts(this.provinceKey)
    })
  }

  create() {
    let dialogRef = this.dialog.open(AddDistrictComponent, {
      data: this.provinceKey,
      panelClass: 'register-test-overlay-panel',
      width: '35vw',
      height: '100vh',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
    dialogRef.afterClosed().subscribe(result => { });
  }
  
  update(item:IDistrict) {
    let dialogRef = this.dialog.open(EditDistrictComponent, {
      data: {...item},
      panelClass: 'register-test-overlay-panel',
      width: '35vw',
      height: '100vh',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
    dialogRef.afterClosed().subscribe(result => { });
  }

  delete(item:IDistrict){
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: {title:'Delete District',memo:'If this district is using in other list you cannot delete district.',name:item.name},
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => { 
      if(result==='yes'){
        this.geo.deleteDistrict(item.key,(success,error)=>{
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