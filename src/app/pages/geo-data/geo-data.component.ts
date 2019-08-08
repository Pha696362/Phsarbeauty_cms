import { DeleteComponent } from './../../components/delete/delete.component';
import { geoLabels } from './../../dummy/label';
import { AddProvinceComponent } from './../../dialog/add-province/add-province.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Geo } from './../../stores/geo.store';
import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Router } from '@angular/router';
import { IGeo } from 'src/app/interfaces/geo';
import { EditProvinceComponent } from 'src/app/dialog/edit-province/edit-province.component';

@Component({
  selector: 'app-geo-data',
  templateUrl: './geo-data.component.html',
  styleUrls: ['./geo-data.component.scss']
})
export class GeoDataComponent implements OnInit {
  tabs=tabs.geo;
  labels=geoLabels;
  dbName:any;
item:any;
  constructor(
    public geo:Geo,
    public router: Router,
    public env:Environment,
    private snackBar:MatSnackBar,
    public dialog:MatDialog) {}

  ngOnInit() {
    this.geo.fetchProvince();
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

  edit(item:IGeo){
    let dialogRef = this.dialog.open(EditProvinceComponent, {
      data: {...item,dbName:this.dbName},
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item:IGeo){
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: {title:'Delete Province',memo:'If this district is using in other list you cannot delete district.',name:item.name},
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => { 
      if(result==='yes'){
        this.geo.deleteProvince(item.key,(success,error)=>{
          if (success) {
            this.snackBar.open('Province has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}
