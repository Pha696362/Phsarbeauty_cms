import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Genders, status, arrestStatus } from 'src/app/dummy/stauts';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AddPersonComponent } from 'src/app/components/add-person/add-person.component';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Environment } from 'src/app/stores/environment.store';
import { Person } from 'src/app/stores/person.store';
import { UploadService } from 'src/app/services/upload.service';
import { ConvertService } from 'src/app/services/convert.service';
import { IPerson } from 'src/app/interfaces/person';
import { MappingService } from 'src/app/services/mapping.service';
import { Crime } from 'src/app/stores/crime.store';

@Component({
  selector: 'app-add-victims',
  templateUrl: './add-victims.component.html',
  styleUrls: ['./add-victims.component.scss']
})
export class AddVictimsComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  first_name: AbstractControl;
  last_name: AbstractControl;
  khmer_first_name: AbstractControl;
  khmer_last_name: AbstractControl;
  phone: AbstractControl;
  unique_id: AbstractControl;
  gender: AbstractControl;
  dob: AbstractControl;
  arrested: AbstractControl;
  address: AbstractControl;
  file: AbstractControl;

  selectedFiles: any;
  genderList = Genders;
  arrestList = arrestStatus;
  process = false;
  constructor(
    public dialogRef: MatDialogRef<AddVictimsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public env: Environment,
    public store: Person,
    public crime: Crime,
    private ups: UploadService
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      khmer_first_name: [null,],
      khmer_last_name: [null,],
      phone: [null,],
      address: [null,],
      unique_id: [null,],
      arrested: [this.arrestList[0],],
      gender: [this.genderList[0], [Validators.required]],
      dob: [ConvertService.age18(), [Validators.required]],
      file: [null,]
    })
    this.first_name = this.form.controls['first_name'];
    this.last_name = this.form.controls['last_name'];
    this.khmer_first_name = this.form.controls['khmer_first_name'];
    this.khmer_last_name = this.form.controls['khmer_last_name'];
    this.phone = this.form.controls['phone'];
    this.unique_id = this.form.controls['unique_id'];
    this.gender = this.form.controls['gender'];
    this.dob = this.form.controls['dob'];
    this.address = this.form.controls['address'];
    this.arrested = this.form.controls['arrested'];
    this.file = this.form.controls["file"];
  }

  onSelectedFile(files) {
    this.selectedFiles = files;
  }

  ngOnInit() {
    this.buildForm();
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }

  create(f: any) {
    if (this.form.valid) {
      const key = this.afs.createId();
      const { first_name, last_name, khmer_first_name, khmer_last_name, unique_id, phone, dob, gender, address, arrested } = f;
      const age = MappingService.calAge(dob);

      const formData: IPerson = {
        key: key,
        crime_key: this.data.item.key,
        first_name: first_name,
        last_name: last_name,
        khmer_first_name: khmer_first_name,
        khmer_last_name: khmer_last_name,
        full_name: last_name + " " + first_name,
        unique_id: unique_id,
        phone: phone,
        dob: dob,
        age: age,
        gender: gender,
        address: address,
        person_type: this.data.type,
        arrested: arrested,
        file: null,
        crimeRef: this.crime.crimeKey,
        status: status[0],
        create_date: new Date(),
        create_by: this.env.user,
        page_key: ConvertService.pageKey(),
      }

      this.store.addNewvictims(formData, this.selectedFiles, this.crime.selectedCrime, this.env.user, (success, res) => {
        if (success) {
          this.dialogRef.close();
          this.snackBar.open('ទិន្នន័យត្រូវបានបង្កើត', 'ជោគជ័យ', { duration: 5000 });
          this.form.reset();
        }
        else {
          alert(res)
        }
      })
    }
  }

}
