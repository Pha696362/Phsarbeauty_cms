import { AngularFirestore } from '@angular/fire/firestore';
import { IGeo } from './../../interfaces/geo';
import { Geo } from './../../stores/geo.store';
import { status } from './../../dummy/stauts';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, NgControl, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FireValidatorsService } from '../../services/fire-validators.service';
import { Environment } from 'src/app/stores/environment.store';

@Component({
  selector: 'app-edit-province',
  templateUrl: './edit-province.component.html',
  styleUrls: ['./edit-province.component.scss']
})
export class EditProvinceComponent implements OnInit {

  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup
 name: AbstractControl
  description: AbstractControl
  shortName: AbstractControl
  process;
  constructor(
    public dialogRef: MatDialogRef<EditProvinceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public fs: Geo
  ) { }

  buildForm(): void {
    const {name,description,code} = this.data;
    this.form = this.fb.group({
      //name: [code,  Validators.compose([Validators.required]) , FireValidatorsService.checkExist(this.afs, 'geo_provinces', 'code')],
      name:[code,[Validators.required]],
      shortName: [name, [Validators.required]],
      description: [description],
    })

    this.name = this.form.controls['name'];
    this.description = this.form.controls['description'];
    this.shortName = this.form.controls['shortName'];
    this.form.controls['name'].disable();

  }

  ngOnInit() {
    this.buildForm();
  }
  
  create(f: any) {
    if (this.form.valid) {
      const formData: IGeo = {
        key: this.data.key,
     //  code: this.data.key,
        description: f.description,
        name: f.shortName,
       status: this.data.status,
        update_date: new Date(),
        update_by: this.env.user,
      }
      this.fs.UpdateProvince(formData, (success, error) => {
        if (success) {
          this.dialogRef.close();
          this.snackBar.open('Province has been updated successfully.', 'done', { duration: 2000 });
          // this.form.reset();
          // this.inputEl.nativeElement.focus();
        }
        else {
          alert(error)
        }
      })
    }
  }

}
