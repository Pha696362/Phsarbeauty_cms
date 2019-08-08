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
import { Crime } from 'src/app/stores/crime.store';
import { Verdict } from 'src/app/stores/verdict.store';
import { AddVerdictComponent } from 'src/app/components/add-verdict/add-verdict.component';
import { EditVerdictComponent } from 'src/app/components/edit-verdict/edit-verdict.component';
import { ConfirmSuccessComponent } from 'src/app/components/confirm-success/confirm-success.component';

@Component({
  selector: 'app-verdict-declaration',
  templateUrl: './verdict-declaration.component.html',
  styleUrls: ['./verdict-declaration.component.scss']
})
export class VerdictDeclarationComponent implements OnInit {
  tabs = tabs.verdict;
  labels = personLabels;
  constructor(
    public router: Router,
    public env: Environment,
    public store: Verdict,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData();
  }

  create() {
    let dialogRef = this.dialog.open(AddVerdictComponent, {
      data: { type: personTypeObj.victim },
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item) {
    let dialogRef = this.dialog.open(EditVerdictComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  confirmDone(item) {
    let dialogRef = this.dialog.open(ConfirmSuccessComponent, {
      data:{title:"បញ្ជាក់បទល្មើស លេខករណី " + item.crime_no,subtitle:" បទល្មើសនេះបានបង្ក្រាប",},
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.updateComplete(item, this.env.user, (success, error) => {
          if (success) {
            this.snackBar.open('បញ្ជាក់បទល្មើសផ្តូរទៅបានបង្ក្រាប', 'ជោគជ័យ', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
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
