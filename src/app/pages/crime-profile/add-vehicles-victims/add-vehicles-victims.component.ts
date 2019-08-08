import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Environment } from 'src/app/stores/environment.store';
import { Verdict } from 'src/app/stores/verdict.store';

@Component({
  selector: 'app-add-vehicles-victims',
  templateUrl: './add-vehicles-victims.component.html',
  styleUrls: ['./add-vehicles-victims.component.scss']
})
export class AddVehiclesVictimsComponent implements OnInit {
  form:FormGroup;
  category:AbstractControl;
  brand:AbstractControl;
  number_plates:AbstractControl;
  v_color:AbstractControl;
  body_number:AbstractControl;
  host_number:AbstractControl;
  note:AbstractControl;
  series:AbstractControl;
  process;
  constructor(
    public dialogRef: MatDialogRef<AddVehiclesVictimsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public env: Environment,
    public store: Verdict,
  ) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm(): void {
    this.form = this.fb.group({
      category: [null, Validators.compose([Validators.required])],
      brand: [null, [Validators.required]],
      number_plates: [null, Validators.compose([Validators.required])],
      series: [null, Validators.compose([Validators.required])],
      v_color: [new Date(), [Validators.required]],
      body_number: [null, Validators.compose([Validators.required])],
      host_number: [new Date(), [Validators.required]],
      note: [null,]
    })

    this.category = this.form.controls['category'];
    this.brand = this.form.controls['brand'];
    this.number_plates = this.form.controls['number_plates'];
    this.series = this.form.controls['series'];
    this.v_color = this.form.controls['v_color'];
    this.body_number = this.form.controls['body_number'];
    this.host_number = this.form.controls['host_number'];
    this.note = this.form.controls["note"];
  }

  create(f){
    
  }
}
