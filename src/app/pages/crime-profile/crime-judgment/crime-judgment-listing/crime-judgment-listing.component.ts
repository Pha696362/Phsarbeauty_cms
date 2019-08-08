import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Environment } from 'src/app/stores/environment.store';
import { Crime } from 'src/app/stores/crime.store';
import { MatSnackBar, MatDialog } from '@angular/material';
import { personTypeObj } from 'src/app/dummy/stauts';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { EditVerdictComponent } from 'src/app/components/edit-verdict/edit-verdict.component';
import { AddVerdictComponent } from 'src/app/components/add-verdict/add-verdict.component';
import { ConfirmSuccessComponent } from 'src/app/components/confirm-success/confirm-success.component';

@Component({
  selector: 'app-crime-judgment-listing',
  templateUrl: './crime-judgment-listing.component.html',
  styleUrls: ['./crime-judgment-listing.component.scss']
})
export class CrimeJudgmentListingComponent implements OnInit {

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
      this.store.fetchJudgmentCrime(param1.id);
    })
  }

  confirmDone(item) {
    let dialogRef = this.dialog.open(ConfirmSuccessComponent, {
      data: { title: "សាលក្រម បញ្ចប់" + item.crime.crime_no, subtitle: "បញ្ចប់សាលក្រម", memo: "សូមពិនិត្យមើលព័ត៌មានទាំងអស់មុនពេលអ្នកបញ្ចប់សាលក្រមនេះ",},
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.completeVerdict(item, this.env.user, (success, error) => {
          if (success) {
            this.snackBar.open('សាលក្រម បញ្ចប់', 'ជោគជ័យ', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }

  create() {
    let dialogRef = this.dialog.open(AddVerdictComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  update(item) {
    let dialogRef = this.dialog.open(EditVerdictComponent, {
      data: item,
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
