import { Environment } from './../../stores/environment.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { status } from './../../dummy/stauts';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FireValidatorsService } from '../../services/fire-validators.service';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup
  name: AbstractControl
  email: AbstractControl
  phone: AbstractControl
  province: AbstractControl
  district: AbstractControl
  commune: AbstractControl
  village: AbstractControl
  description: AbstractControl
  isPhone: AbstractControl
  isProvinceLevel: AbstractControl
  isDistrictLevel: AbstractControl
  isCommuneLevel: AbstractControl
  isVillageLevel: AbstractControl
  process;
  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public store: Environment
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required]), FireValidatorsService.checkExist(this.afs, 'geo_provinces', 'code')],
      email: [null, [Validators.required]],
      description: [null],
      phone: [null, [Validators.required]],
      province: [null, [Validators.required]],
      district: [null, [Validators.required]],
      commune: [null, [Validators.required]],
      village: [null, [Validators.required]],
      isPhone: [null, [Validators.required]],
    })
    this.name = this.form.controls['name'];
    this.description = this.form.controls['description'];
    this.email = this.form.controls['email'];
    this.phone = this.form.controls['phone'];
    this.province = this.form.controls['province'];
    this.district = this.form.controls['district'];
    this.village = this.form.controls['village'];
    this.isPhone = this.form.controls['isPhone'];
   
  }


  ngOnInit() {
    this.buildForm();
  }

  create(f: any) {
    if (this.form.valid) {
     
    }
  }

}
