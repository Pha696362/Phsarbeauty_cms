import { Component, OnInit } from '@angular/core';
import { AddMaterialLostComponent } from '../add-material-lost/add-material-lost.component';
import { crimeTypes, materialLostTypes } from 'src/app/dummy/stauts';
import { Router, ActivatedRoute } from '@angular/router';
import { Environment } from 'src/app/stores/environment.store';
import { Crime } from 'src/app/stores/crime.store';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { EditMaterialLostComponent } from '../edit-material-lost/edit-material-lost.component';

@Component({
  selector: 'app-material-lost',
  templateUrl: './material-lost.component.html',
  styleUrls: ['./material-lost.component.scss']
})
export class MaterialLostComponent implements OnInit {

  type = materialLostTypes;
  listType;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public env: Environment,
    public store: Crime,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.parent.parent.params.subscribe(param1=>{
      this.route.params.subscribe(param2=>{
        this.listType = this.type.filter(f=>f.text == param2.tid)[0]; 
        this.store.fetchmateriallostCrime(param1.id,this.listType.key);
      })
    })
  }
  create(item:any) {
  
    const type = this.listType
    let dialogRef = this.dialog.open(AddMaterialLostComponent, {
      data: {item, type},
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }
  update(item:any) {
  
    const type = this.listType
    let dialogRef = this.dialog.open(EditMaterialLostComponent, {
      data: {item, type},
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
        this.store.deletemateriallostCrime(crimeKey, item, (success, error) => {
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
