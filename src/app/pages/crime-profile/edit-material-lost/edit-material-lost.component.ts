import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Environment } from 'src/app/stores/environment.store';
import { Crime } from 'src/app/stores/crime.store';
import { DataService } from 'src/app/services/data.service';
import { recordStatus } from 'src/app/dummy/stauts';
import { ConvertService } from 'src/app/services/convert.service';

@Component({
  selector: 'app-edit-material-lost',
  templateUrl: './edit-material-lost.component.html',
  styleUrls: ['./edit-material-lost.component.scss']
})
export class EditMaterialLostComponent implements OnInit {

  form:FormGroup;
  category:AbstractControl;
  brand:AbstractControl;

  year_manufacture:AbstractControl;
  code:AbstractControl;

  number_plates:AbstractControl;
  v_color:AbstractControl;
  body_number:AbstractControl;
  host_number:AbstractControl;
  series:AbstractControl;

  note:AbstractControl;
  
  missing_number:AbstractControl;
  found:AbstractControl;
  
  constructor(
    public dialogRef: MatDialogRef<EditMaterialLostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public env: Environment,
    public store: Crime,
    private ds: DataService,

  ) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm(): void {
    this.form = this.fb.group({
      category: [this.data.item.category, Validators.compose([Validators.required])],
      brand: [this.data.item.brand],

      year_manufacture: [this.data.item.year_manufacture],
      code: [this.data.item.code],
      missing_number:[this.data.item.missing_number],
      found:[this.data.item.found],

      number_plates: [this.data.item.number_plates],
      series: [this.data.item.series],
      v_color: [this.data.item.v_color],
      body_number: [this.data.item.body_number,],
      host_number: [this.data.item.host_number],

      note: [this.data.item.note,]
    })

    this.category = this.form.controls['category'];
    this.brand = this.form.controls['brand'];

    this.year_manufacture = this.form.controls['year_manufacture'];
    this.code = this.form.controls['code'];

    this.number_plates = this.form.controls['number_plates'];
    this.series = this.form.controls['series'];
    this.v_color = this.form.controls['v_color'];
    this.body_number = this.form.controls['body_number'];
    this.host_number = this.form.controls['host_number'];

    this.missing_number = this.form.controls['missing_number'];
    this.found = this.form.controls['found'];
    this.note = this.form.controls["note"];

  }

  create(f: any){
    if (this.form.valid) {
      this.form.disable();

      const item: any = {
        key:  this.data.item.key,
        crime_key: this.data.item.crime_key,
        type: this.data.type,
        category: f.category,
        brand:f.brand,

        year_manufacture:f.year_manufacture,
        code:f.code,
        missing_number: f.missing_number,
        found: f.found,
        
        number_plates:f.number_plates,
        series:f.series,
        v_color:f.v_color,
        body_number:f.body_number,
        host_number:f.host_number,
        note:f.note,
        status: recordStatus.active,
        page_key: ConvertService.pageKey(),
        create_date: new Date(),
        create_by: this.env.user,
      }
      this.store.editmateriallost(item, (success, error) => {
        if (success) {
          this.form.enable();
          this.snackBar.open('Material lost crime has been created.', 'done', { duration: 2000 });
          this.dialogRef.close()

        } else {
          this.form.enable();
          this.snackBar.open(error, 'Error');
        }
      })
    }
  }

}
