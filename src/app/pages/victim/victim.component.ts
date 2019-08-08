import { DeleteComponent } from './../../components/delete/delete.component';
import { personLabels } from './../../dummy/label';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Router } from '@angular/router';
import { AddPersonComponent } from 'src/app/components/add-person/add-person.component';
import { personTypeObj } from 'src/app/dummy/stauts';
import { Person } from 'src/app/stores/person.store';
import { EditPersonComponent } from 'src/app/components/edit-person/edit-person.component';

@Component({
  selector: 'app-victim',
  templateUrl: './victim.component.html',
  styleUrls: ['./victim.component.scss']
})
export class VictimComponent implements OnInit {
  tabs = tabs.victim;
  labels = personLabels;
  
  constructor(
    public router: Router,
    public env: Environment,
    public store: Person,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData(personTypeObj.victim.key);
  }

  create() {
    let dialogRef = this.dialog.open(AddPersonComponent, {
      data: { type: personTypeObj.victim },
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item) {
    let dialogRef = this.dialog.open(EditPersonComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'លុបទិន្នន័យ', memo: 'ដំណើរការនេះនឹងលុបទិន្នន័យចេញពីប្រព័ន្ធ', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(item, (success, error) => {
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
