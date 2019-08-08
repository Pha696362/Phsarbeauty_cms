import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MappingService } from 'src/app/services/mapping.service';
import { DataService } from 'src/app/services/data.service';
import { Crime } from 'src/app/stores/crime.store';
import { Environment } from 'src/app/stores/environment.store';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { ConvertService } from 'src/app/services/convert.service';

@Component({
  selector: 'app-overview-crime-home',
  templateUrl: './overview-crime-home.component.html',
  styleUrls: ['./overview-crime-home.component.scss']
})
export class OverviewCrimeHomeComponent implements OnInit {

  

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public env: Environment,
    public store: Crime,
    private ds: DataService,
  ) { }

  ngOnInit() {

    
  }


 

}
