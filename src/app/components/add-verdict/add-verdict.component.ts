import { Environment } from './../../stores/environment.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { status, judgmentStatus } from './../../dummy/stauts';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { IPerson } from 'src/app/interfaces/person';
import { ConvertService } from 'src/app/services/convert.service';
import { Observable } from 'rxjs';
import { MappingService } from 'src/app/services/mapping.service';
import { Verdict } from 'src/app/stores/verdict.store';
import { IVerdict } from 'src/app/interfaces/verdict';
import { Crime } from 'src/app/stores/crime.store';

@Component({
  selector: 'app-add-verdict',
  templateUrl: './add-verdict.component.html',
  styleUrls: ['./add-verdict.component.scss']
})
export class AddVerdictComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  verdict_no: AbstractControl;
  judge: AbstractControl;
  judge_ask_date: AbstractControl;
  judgment_writer: AbstractControl;
  judgment_writer_date: AbstractControl;
  file: AbstractControl;
  process;
  selectedFiles: any;

  filteredCrimeStates: Observable<any[]>;
  filteredJudgeStates: Observable<any[]>;
  filteredJudgeWriterStates: Observable<any[]>;

  constructor(
    public dialogRef: MatDialogRef<AddVerdictComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public env: Environment,
    public store: Verdict,
    public crimeStore: Crime
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      verdict_no: [null, [Validators.required]],
      judge: [null, Validators.compose([Validators.required, MappingService.validSelected.bind(this)])],
      judge_ask_date: [new Date(), [Validators.required]],
      judgment_writer: [null, Validators.compose([Validators.required, MappingService.validSelected.bind(this)])],
      judgment_writer_date: [new Date(), [Validators.required]],
      file: [null,]
    })

    this.verdict_no = this.form.controls['verdict_no'];
    this.judge = this.form.controls['judge'];
    this.judge_ask_date = this.form.controls['judge_ask_date'];
    this.judgment_writer = this.form.controls['judgment_writer'];
    this.judgment_writer_date = this.form.controls['judgment_writer_date'];
    this.file = this.form.controls["file"];
  }

  onSelectedFile(files) {
    this.selectedFiles = files;
  }

  ngOnInit() {
    this.buildForm();

    this.crimeStore.fetchCrimeDoc(this.crimeStore.crimeKey);

    this.store.fetchJudge((list) => {
      this.filteredJudgeStates = MappingService.autoComplete(this.judge, list, "full_name");
    });

    this.store.fetchJudgeWriter((list) => {
      this.filteredJudgeWriterStates = MappingService.autoComplete(this.judgment_writer, list, "full_name");
    });
  }

  displayName(item: any) {
    return item ? item.name : item;
  }

  displayFullName(item: any) {
    return item ? item.full_name : item;
  }

  displayCrimeNo(item: any) {
    return item ? item.crime_no : item;
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }

  create(f: any) {
    if (!this.crimeStore.selectedCrime) return;
    if (this.form.valid) {
      const key = this.afs.createId();
      let { verdict_no, judge, judge_ask_date, judgment_writer, judgment_writer_date } = f;
      const formData: IVerdict = {
        key: key,
        crime: this.crimeStore.selectedCrime,
        verdict_no: verdict_no,
        judge: judge,
        judge_ask_date: judge_ask_date,
        judge_ask_date_key: ConvertService.toDateKey(judge_ask_date),
        judgment_status: judgmentStatus.pending,
        judgment_writer: judgment_writer,
        judgment_writer_date: judgment_writer_date,
        judgment_writer_date_key: ConvertService.toDateKey(judgment_writer_date),
        status: status[0],
        create_date: new Date(),
        create_by: this.env.user,
        page_key: ConvertService.pageKey(),
      }
      this.store.addNew(formData, this.selectedFiles, (success, error) => {
        if (success) {
          this.dialogRef.close();
          this.snackBar.open('ទិន្នន័យត្រូវបានបង្កើត', 'ជោគជ័យ', { duration: 5000 });
          this.form.reset();
        }
        else {
          alert(error)
        }
      })
    }
  }

}
