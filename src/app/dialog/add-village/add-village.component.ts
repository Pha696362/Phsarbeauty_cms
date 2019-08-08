import { AngularFirestore } from '@angular/fire/firestore';
import { IGeo, IDistrict, ICommunes, IVillage } from './../../interfaces/geo';
import { Geo } from './../../stores/geo.store';
import { status } from './../../dummy/stauts';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FireValidatorsService } from '../../services/fire-validators.service';
import { Environment } from 'src/app/stores/environment.store';

@Component({
  selector: 'app-add-village',
  templateUrl: './add-village.component.html',
  styleUrls: ['./add-village.component.scss']
})
export class AddVillageComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;

  form: FormGroup
  name: AbstractControl
  description: AbstractControl
  shortName: AbstractControl

  campusList = [];
  campusid: string;
  process: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddVillageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public fs: Geo
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required]), FireValidatorsService.checkExist(this.afs, 'geo_villages', 'code')],
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
      const formData: IVillage = {
        key: key,
        province: this.fs.selectedProvince,
        district: this.fs.selectedDistrict,
        commune: this.fs.selectedCommune,
        code: f.name,
        description: f.description,
        name: f.shortName,
        status: status[0],
        create_date: new Date(),
        create_by: this.env.user,
      }
      this.fs.addVillage(formData, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Village has been created.', 'done', { duration: 2000 });
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
