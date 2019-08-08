import { AddVehiclesExhibitsComponent } from './../../crime-profile/add-vehicles-exhibits/add-vehicles-exhibits.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-crime-property',
  templateUrl: './crime-property.component.html',
  styleUrls: ['./crime-property.component.scss']
})
export class CrimePropertyComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
  }


  create() {
    let dialogRef = this.dialog.open(AddVehiclesExhibitsComponent, {
      data:null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }
}
