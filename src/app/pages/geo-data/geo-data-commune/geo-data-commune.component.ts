import { ICommunes } from './../../../interfaces/geo';
import { AddCommuneComponent } from './../../../dialog/add-commune/add-commune.component';
import { Geo } from './../../../stores/geo.store';
import { DeleteComponent } from './../../../components/delete/delete.component';
import { tabs } from './../../../dummy/tabs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { EditCommuneComponent } from 'src/app/dialog/edit-commune/edit-commune.component';

@Component({
  selector: 'app-geo-data-commune',
  templateUrl: './geo-data-commune.component.html',
  styleUrls: ['./geo-data-commune.component.scss']
})
export class GeoDataCommuneComponent implements OnInit {
  tabs = tabs.geo;
  districtKey: string;

  constructor(
    public geo: Geo,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach(params => {
      this.districtKey = params["id"];
      this.geo.fetchSelectedDistrict(this.districtKey,req=>{
        if(req){
          const {province}=req;
          this.geo.fetchDistricts(province.key)
        }
      });
      this.geo.fetchCommunes(this.districtKey)
    })
  }

  create() {
    let dialogRef = this.dialog.open(AddCommuneComponent, {
      data: this.districtKey,
      panelClass: 'register-test-overlay-panel',
      width: '35vw',
      height: '100vh',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
    dialogRef.afterClosed().subscribe(result => { });
  }


  update(item: ICommunes) {
    let dialogRef = this.dialog.open(EditCommuneComponent, {
      data:{...item}, 
      panelClass: 'register-test-overlay-panel',
      width: '35vw',
      height: '100vh',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
    dialogRef.afterClosed().subscribe(result => { });
  }


  delete(item: ICommunes) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete District', memo: 'If this district is using in other list you cannot delete district.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.geo.deleteCommune(item.key, (success, error) => {
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