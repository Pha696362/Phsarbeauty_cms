import { AddVillageComponent } from './../../../dialog/add-village/add-village.component';
import { Geo } from './../../../stores/geo.store';
import { DeleteComponent } from './../../../components/delete/delete.component';
import { tabs } from './../../../dummy/tabs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { EditVillageComponent } from 'src/app/dialog/edit-village/edit-village.component';

@Component({
  selector: 'app-geo-data-village',
  templateUrl: './geo-data-village.component.html',
  styleUrls: ['./geo-data-village.component.scss']
})
export class GeoDataVillageComponent implements OnInit {
  tabs = tabs.geo;
  communeKey: string;

  constructor(
    public geo: Geo,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach(params => {
      this.communeKey = params["id"];
      this.geo.fetchSelectedCommune(this.communeKey, (commune) => {
        this.geo.fetchCommunes(commune.district.key)
      })
      this.geo.fetchVillages(this.communeKey)
    })
  }

  create() {
    let dialogRef = this.dialog.open(AddVillageComponent, {
      data: null,
      panelClass: 'register-test-overlay-panel',
      width: '35vw',
      height: '100vh',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
    dialogRef.afterClosed().subscribe(result => { });
  }

  update(item: any) {
    let dialogRef = this.dialog.open(EditVillageComponent, {
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

  delete(item: any) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete District', memo: 'If this district is using in other list you cannot delete district.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.geo.deleteVillage(item.key, (success, error) => {
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