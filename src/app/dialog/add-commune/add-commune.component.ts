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
  selector: 'app-add-commune',
  templateUrl: './add-commune.component.html',
  styleUrls: ['./add-commune.component.scss']
})
export class AddCommuneComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;

  form: FormGroup
  name: AbstractControl
  description: AbstractControl
  shortName: AbstractControl

  campusList = [];
  campusid: string;
  process: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddCommuneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public fs: Geo
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required]), FireValidatorsService.checkExist(this.afs, 'geo_communes', 'code')],
      description: [null],
      shortName: [null, [Validators.required]],
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
      this.process = true
      const key = this.afs.createId();
      const formData: ICommunes = {
        key: key,
        province:this.fs.selectedProvince,
        district:this.fs.selectedDistrict,
        code: f.name,
        description: f.description,
        name: f.shortName,
        status: status[0],
        create_date: new Date(),
        create_by: this.env.user,
      }
      this.fs.addCommune(formData, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Commune has been created.', 'done', { duration: 2000 });
          this.form.reset();
          this.inputEl.nativeElement.focus();
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
