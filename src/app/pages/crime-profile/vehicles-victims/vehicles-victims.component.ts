import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Environment } from 'src/app/stores/environment.store';
import { Crime } from 'src/app/stores/crime.store';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddVehiclesVictimsComponent } from '../add-vehicles-victims/add-vehicles-victims.component';
import { AddVictimsComponent } from '../add-victims/add-victims.component';
import { personTypeObj } from 'src/app/dummy/stauts';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { EditVictimsComponent } from '../edit-victims/edit-victims.component';

@Component({
  selector: 'app-vehicles-victims',
  templateUrl: './vehicles-victims.component.html',
  styleUrls: ['./vehicles-victims.component.scss']
})
export class VehiclesVictimsComponent implements OnInit {

  constructor(
    public router: Router,
    public env: Environment,
    public store: Crime,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.store.crimeKey = null;
    this.route.parent.parent.params.subscribe(param1 => {
      this.store.crimeKey = param1.id;
      this.store.fetchpersonCrime(param1.id, "victims");
    })
  }

  create(item: any) {
    let dialogRef = this.dialog.open(AddVictimsComponent, {
      data: { item, type: personTypeObj.victim },
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  update(item: any) {
    let dialogRef = this.dialog.open(EditVictimsComponent, {
      data: { item, type: personTypeObj.victim },
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(crimeKey, item) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'លុបទិន្នន័យ', memo: 'ដំណើរការនេះនឹងលុបទិន្នន័យចេញពីប្រព័ន្ធ', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.deletepersonCrime(crimeKey, item, (success, error) => {
          if (success) {
            this.snackBar.open('ទិន្នន័យត្រូវបានលុប', 'ជោគជ័យ', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }


}
