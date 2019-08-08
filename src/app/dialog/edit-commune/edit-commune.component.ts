import { AngularFirestore } from '@angular/fire/firestore';
import { IGeo, IDistrict, ICommunes } from './../../interfaces/geo';
import { Geo } from './../../stores/geo.store';
import { status } from './../../dummy/stauts';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FireValidatorsService } from '../../services/fire-validators.service';
import { Environment } from 'src/app/stores/environment.store';

@Component({
  selector: 'app-edit-commune',
  templateUrl: './edit-commune.component.html',
  styleUrls: ['./edit-commune.component.scss']
})
export class EditCommuneComponent implements OnInit {

  @ViewChild("focusInput") inputEl: ElementRef;

  form: FormGroup
  name: AbstractControl
  description: AbstractControl
  shortName: AbstractControl

  campusList = [];
  campusid: string;
  process: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<EditCommuneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public fs: Geo
  ) { }

  buildForm(): void {
    const {name,code,description } = this.data;
    this.form = this.fb.group({
      name: [code, Validators.compose([Validators.required])],
      description: [description],
      shortName: [name, [Validators.required]],
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
      this.process = true
      const formData: ICommunes = {
        key: this.data.key,
        province:this.fs.selectedProvince,
        district:this.fs.selectedDistrict,
        description: f.description,
        name: f.shortName,
        status: this.data.status,
        update_date: new Date(),
        update_by: this.env.user,
      }
      this.fs.updateCommune(formData, (success, error) => {
        if (success) {
          this.dialogRef.close();
          this.snackBar.open('Commune has been updated successfully.', 'done', { duration: 2000 });
          this.process = false
        }
        else {
          alert(error)
          this.process = false
        }
      })
    }
  }

}
