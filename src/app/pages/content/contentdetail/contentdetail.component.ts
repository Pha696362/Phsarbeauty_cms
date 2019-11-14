import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Bookstore } from 'src/app/stores/bookstore';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddNewContentComponent } from '../add-new-content/add-new-content.component';
import { EditContentComponent } from '../edit-content/edit-content.component';
import { IContent } from 'src/app/interfaces/bookstore';
import { DeleteComponent } from 'src/app/components/delete/delete.component';

@Component({
  selector: 'app-contentdetail',
  templateUrl: './contentdetail.component.html',
  styleUrls: ['./contentdetail.component.scss']
})
export class ContentdetailComponent implements OnInit {
  tabs = tabs.content;
  id;
  category: any = null;
  constructor(
    private router: Router,
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public route:ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
    // this.store.fetchData(this.ds.categoryRef());
    // this.route.params.subscribe(async param=>{
    //   this.id = param.id;
    //   this.store.fetchData(this.ds.contentRef(param.id));
      
    // })

    this.route.params.subscribe(async param=>{
      this.id = param.id;
      this.category = await this.store.fetchDataDoc(this.ds.categoryRef(), param.id);
      this.store.fetchData(this.ds.contentRef(param.id));
      
    })
  }
  _goBack() {
    this.router.navigate(['/app/content/']); 
    // [routerLink]="['/app/course/' + item?.key]"
  }
  create() {
    let dialogRef = this.dialog.open(AddNewContentComponent, {
      data: this.category,
      width: '85vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0'});
  }

  edit(item: IContent) {
    let dialogRef = this.dialog.open(EditContentComponent, {
      data: item,
      width: '85vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

 


  delete(item: IContent) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete Content', memo: 'If content is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });

     dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.contentcRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open('Content has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}
