import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Genders, status, arrestStatus } from 'src/app/dummy/stauts';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Environment } from 'src/app/stores/environment.store';
import { Person } from 'src/app/stores/person.store';
import { UploadService } from 'src/app/services/upload.service';
import { ConvertService } from 'src/app/services/convert.service';
import { IPerson } from 'src/app/interfaces/person';
import { MappingService } from 'src/app/services/mapping.service';

@Component({
  selector: 'app-edit-victims',
  templateUrl: './edit-victims.component.html',
  styleUrls: ['./edit-victims.component.scss']
})
export class EditVictimsComponent implements OnInit {

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
  process= false;
  constructor(
    public dialogRef: MatDialogRef<EditVictimsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public env: Environment,
    public store: Person,
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
      arrested: [null,],
      unique_id: [null],
      gender: [null, [Validators.required]],
      dob: [null, [Validators.required]],
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
    const { first_name, last_name, khmer_first_name, khmer_last_name, unique_id, phone, dob, gender, address, arrested } = this.data.item;
    const arrest = this.arrestList.filter(m=> m.key === arrested.key)[0];

    this.form.patchValue({
      first_name: first_name,
      last_name: last_name,
      khmer_first_name: khmer_first_name,
      khmer_last_name: khmer_last_name,
      phone: phone,
      address: address,
      arrested: arrest,
      unique_id: unique_id,
      gender: gender,
      dob: dob.toDate(),
    })
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }

  create(f: any) {
    if (this.form.valid) {
      const key = this.data.item.key;
      const { first_name, last_name, khmer_first_name, khmer_last_name, unique_id, phone, dob, gender, address, arrested } = f;
      const age = MappingService.calAge(dob);

      const formData: IPerson = {
        key: key,
        crime_key: this.data.item.crime_key,
        first_name: first_name,
        last_name: last_name,
        khmer_first_name: khmer_first_name,
        khmer_last_name: khmer_last_name,
        full_name: last_name + " " + first_name,
        unique_id: unique_id,
        phone: phone,
        dob: dob,
        gender: gender,
        address: address,
        person_type: this.data.type,
        arrested: arrested,
        status: status[0],
        create_date: new Date(),
        create_by: this.env.user,
        page_key: ConvertService.pageKey(),
      }
      this.store.updatevictims(formData, this.selectedFiles, (success, res) => {
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
