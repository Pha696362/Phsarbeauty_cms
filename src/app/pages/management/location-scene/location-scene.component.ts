import { ActivatedRoute } from '@angular/router';
import { managementItemApiObj } from './../../../dummy/management';
import { DeleteComponent } from './../../../components/delete/delete.component';
import { AddDataManagementComponent } from './../../../dialog/add-data-management/add-data-management.component';
import { personLabels } from './../../../dummy/label';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Management } from 'src/app/stores/management.store';
import { DataService } from 'src/app/services/data.service';
import { EditDataManagementComponent } from 'src/app/dialog/edit-data-management/edit-data-management.component';
import { Category } from 'src/app/stores/category.store';

@Component({
  selector: 'app-location-scene',
  templateUrl: './location-scene.component.html',
  styleUrls: ['./location-scene.component.scss']
})
export class LocationSceneComponent implements OnInit {
  tabs = [];
  labels = personLabels;
  dbName: any;
  item: any;

  constructor(
    public store: Management,
    public router: Router,
    public route: ActivatedRoute,
    public env: Environment,
    private ds: DataService,
    private snackBar: MatSnackBar,
    private subcategory: Category,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.forEach(param => {
      const key = param["id"];
      this.tabs = [];
      this.item = managementItemApiObj[key];
      if (this.item) {
        this.tabs.push({ path: `/app/data/${this.item.key}`, label: this.item.name }),
          this.dbName = this.item.key
        this.store.fetchDataApi(this.dbName);
      }
      else {
        this.router.navigate(['/404/' + this.router.url])
      }
    })
  }

  create() {
    this.store.data.forEach(item => {
      this.ds.managementRef("case-reason").doc(item.key).set(item)
    })
    let dialogRef = this.dialog.open(AddDataManagementComponent, {
      data: this.item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item: any) {
    let dialogRef = this.dialog.open(EditDataManagementComponent, {
      data: { ...item, dbName: this.dbName, label: this.item.name },
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item: any) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete Category', memo: 'If this district is using in other list you cannot delete district.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.dbName, item.key, (success, error) => {
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
