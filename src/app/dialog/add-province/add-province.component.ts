import { AngularFirestore } from '@angular/fire/firestore';
import { IGeo } from './../../interfaces/geo';
import { Geo } from './../../stores/geo.store';
import { status } from './../../dummy/stauts';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FireValidatorsService } from '../../services/fire-validators.service';
import { Environment } from 'src/app/stores/environment.store';

@Component({
  selector: 'app-add-province',
  templateUrl: './add-province.component.html',
  styleUrls: ['./add-province.component.scss']
})
export class AddProvinceComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup
  name: AbstractControl
  description: AbstractControl
  shortName: AbstractControl
  process;
  constructor(
    public dialogRef: MatDialogRef<AddProvinceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public fs: Geo
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required]), FireValidatorsService.checkExist(this.afs, 'geo_provinces', 'code')],
      shortName: [null, [Validators.required]],
      description: [null],
    })
    this.name = this.form.controls['name'];
    this.description = this.form.controls['description'];
    this.shortName = this.form.controls['shortName'];
  }


  ngOnInit() {
    this.buildForm();
  }

  create(f: any, isNew) {
    if (this.form.valid) {
      const key = this.afs.createId();
      const formData: IGeo = {
        key: key,
        code: f.name,
        description: f.description,
        name: f.shortName,
        status: status[0],
        create_date: new Date(),
        create_by: this.env.user,
      }
      this.fs.addProvince(formData, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Province has been created.', 'done', { duration: 5000 });
          this.form.reset();
          this.inputEl.nativeElement.focus();
        }
        else {
          alert(error)
        }
      })
    }
  }

}
