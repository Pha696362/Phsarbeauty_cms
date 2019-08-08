import { Environment } from './../../stores/environment.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { status, Genders, religions, nationalityArray, IDtype } from './../../dummy/stauts';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { IVictim } from 'src/app/interfaces/person';
import { Person } from 'src/app/stores/person.store';
import { ConvertService } from 'src/app/services/convert.service';
import { UploadService } from 'src/app/services/upload.service';
import { MappingService } from 'src/app/services/mapping.service';
import { Observable } from 'rxjs';
import { Geo } from 'src/app/stores/geo.store';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Crime } from 'src/app/stores/crime.store';

@Component({
  selector: 'app-close-crime-case',
  templateUrl: './close-crime-case.component.html',
  styleUrls: ['./close-crime-case.component.scss']
})
export class CloseCrimeCaseComponent implements OnInit {

  form: FormGroup;
  close_date: AbstractControl;
  note: AbstractControl;
  conclusion: AbstractControl;
  file: AbstractControl;

  selectedFiles: any;

  constructor(
    public dialogRef: MatDialogRef<CloseCrimeCaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public env: Environment,
    public router: Router,
    public store: Crime,
    public ds: DataService,
  ) { }

  process = false
  buildForm(): void {
    this.form = this.fb.group({
      close_date: [new Date(), [Validators.required]],
      conclusion: [null, [Validators.required]],
      note: [null,],
      file: [null,]
    });

    this.close_date = this.form.controls['close_date'];
    this.conclusion = this.form.controls['conclusion'];
    this.note = this.form.controls['note'];
    this.file = this.form.controls['file'];
  }

  onSelectedFile(files) {
    this.selectedFiles = files;
  }

  ngOnInit() {
    this.buildForm();
  }

  create(f: any) {
    if (this.form.valid) {
      const key = this.afs.createId();
      let { close_date, conclusion, note } = f;

      const item = {
        key: key,
        crimeKey: this.data.key,
        close_by: this.env.user,
        close_date: close_date,
        conclusion: conclusion,
        note: note,
        file: null,
        status: status[0],
        create_date: new Date(),
        create_by: this.env.user,
        page_key: ConvertService.pageKey(),
      }

      this.store.closeCrime(item, this.selectedFiles, (success, res) => {
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
