import { BOOK_OPTIONS } from './../../dummy/status';
import { AddNewCoverBookComponent } from './add-new-cover-book/add-new-cover-book.component';
import { AddNewBookComponent } from './add-new-book/add-new-book.component';
import { DeleteComponent } from './../../components/delete/delete.component';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Bookstore } from './../../stores/bookstore';
import { tabs } from './../../dummy/tabs';
import { Component, OnInit } from '@angular/core';
import { IGenre, IBook } from 'src/app/interfaces/bookstore';
import { AddNewPdfBookComponent } from './add-new-pdf-book/add-new-pdf-book.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  tabs = tabs.books;
  constructor(
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.tabs=[];
    this.tabs.push({ path: '/app/books/data', label: "Data" })
    BOOK_OPTIONS.map(m=>{
      this.tabs.push({ path:`/app/books/${m.route}` , label: m.text })
    })
    this.store.fetchData(this.ds.bookRef());
  }

  

  create() {
    let dialogRef = this.dialog.open(AddNewBookComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
      disableClose: true,
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  cover_upload(item) {
    let dialogRef = this.dialog.open(AddNewCoverBookComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
      disableClose: true,
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  pdf_upload(item) {
    let dialogRef = this.dialog.open(AddNewPdfBookComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
      disableClose: true,
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item: IGenre) {
    // let dialogRef = this.dialog.open(EditProvinceComponent, {
    //   data: {...item,dbName:this.dbName},
    //   width: '35vw',
    //   height: '100vh',
    //   role: 'dialog',
    // });
    // dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item: IBook) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete Book', memo: 'If book is using by other function in system you cannot delete it.', name: item.title },
      width: '35vw',
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.bookRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open('Genre has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}
