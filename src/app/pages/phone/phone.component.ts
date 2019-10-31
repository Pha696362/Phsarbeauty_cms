import { Component, OnInit } from '@angular/core';
import { Bookstore } from 'src/app/stores/bookstore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { EditPhonenumberComponent } from './edit-phonenumber/edit-phonenumber.component';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { IPhonenumber } from 'src/app/interfaces/bookstore';
import { tabs } from 'src/app/dummy/tabs';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  tabs = tabs.phonenumber;
  constructor(
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData(this.ds.phonenumberRef());
  }

 

  edit(item:IPhonenumber) {
    let dialogRef = this.dialog.open(EditPhonenumberComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item: IPhonenumber) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete About', memo: 'If tag is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.phonenumberRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open('About has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}