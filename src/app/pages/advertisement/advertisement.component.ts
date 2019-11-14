import { Component, OnInit } from '@angular/core';
import { Bookstore } from 'src/app/stores/bookstore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { AddNewAdvertisementComponent } from './add-new-advertisement/add-new-advertisement.component';
import { IGenre, IAdvertise } from 'src/app/interfaces/bookstore';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { tabs } from 'src/app/dummy/tabs';
import { EditAdvertisementComponent } from './edit-advertisement/edit-advertisement.component';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {

  tabs = tabs.advertise;
  constructor(
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData(this.ds.advertiseRef());
  }

  create() {
    let dialogRef = this.dialog.open(AddNewAdvertisementComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  // cover(item) {
  //   let dialogRef = this.dialog.open(AddCoverSlideComponent, {
  //     data: item,
  //     width: '35vw',
  //     height: '100vh',
  //     role: 'dialog',
  //   });
  //   dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  // }

  edit(item: IAdvertise) {
    let dialogRef = this.dialog.open(EditAdvertisementComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item: IAdvertise) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete Advertisement', memo: 'If advertisement is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.advertiseRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open('Advertisement has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}

