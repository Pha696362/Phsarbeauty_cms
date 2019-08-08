import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AddVehiclesVictimsComponent } from '../add-vehicles-victims/add-vehicles-victims.component';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Environment } from 'src/app/stores/environment.store';
import { Verdict } from 'src/app/stores/verdict.store';

@Component({
  selector: 'app-add-weapons-victims',
  templateUrl: './add-weapons-victims.component.html',
  styleUrls: ['./add-weapons-victims.component.scss']
})
export class AddWeaponsVictimsComponent implements OnInit {
  process;
  form:FormGroup;
  category:AbstractControl;
  brand:AbstractControl;
  year_manufacture:AbstractControl;
  code:AbstractControl;
  note:AbstractControl;
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
      year_manufacture: [null, Validators.compose([Validators.required])],
      code: [null, Validators.compose([Validators.required])],
      note: [null,]
    })

    this.category = this.form.controls['category'];
    this.brand = this.form.controls['brand'];
    this.year_manufacture = this.form.controls['year_manufacture'];
    this.code = this.form.controls['code'];
    this.note = this.form.controls["note"];
  }

}
