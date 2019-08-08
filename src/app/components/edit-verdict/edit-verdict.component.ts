import { Environment } from './../../stores/environment.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { status } from './../../dummy/stauts';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { IPerson } from 'src/app/interfaces/person';
import { ConvertService } from 'src/app/services/convert.service';
import { Observable } from 'rxjs';
import { MappingService } from 'src/app/services/mapping.service';
import { Verdict } from 'src/app/stores/verdict.store';
import { IVerdict } from 'src/app/interfaces/verdict';
import { AngularFireStorage } from '@angular/fire/storage';
import { DataService } from 'src/app/services/data.service';
import { DeleteComponent } from '../delete/delete.component';
import { Crime } from 'src/app/stores/crime.store';

@Component({
  selector: 'app-edit-verdict',
  templateUrl: './edit-verdict.component.html',
  styleUrls: ['./edit-verdict.component.scss']
})
export class EditVerdictComponent implements OnInit {
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

  filteredJudgeStates: Observable<any[]>;
  filteredJudgeWriterStates: Observable<any[]>;

  constructor(
    public dialogRef: MatDialogRef<EditVerdictComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public env: Environment,
    public store: Verdict,
    private ds: DataService,
    private storage: AngularFireStorage,
    public dialog: MatDialog,
    public crime: Crime
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

  ngOnInit() {
    this.buildForm();
    this.store.fetchImages(this.data.key);


    this.store.fetchJudge((judges) => {
      this.filteredJudgeStates = MappingService.autoComplete(this.judge, judges, "full_name");

      this.store.fetchJudgeWriter((judgeWriters) => {
        this.filteredJudgeWriterStates = MappingService.autoComplete(this.judgment_writer, judgeWriters, "full_name");

        let { verdict_no, judge, judge_ask_date, judgment_writer, judgment_writer_date } = this.data;
        this.form.patchValue({
          verdict_no: verdict_no,
          judge: judge,
          judge_ask_date: judge_ask_date.toDate(),
          judgment_writer: judgment_writer,
          judgment_writer_date: judgment_writer_date.toDate(),
        })
      });
    });

  }

  onSelectedFile(files) {
    this.selectedFiles = files;
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

  deleteFile(image) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'លុបរូបភាព', memo: 'ដំណើរការនេះនឹងលុបរូបភាពចេញពីប្រព័ន្ធ' },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        const path = `verdict/${this.data.key}/${image.name}`;
        this.ds.verdictRef().doc(this.data.key).collection('files').doc(image.key).delete().then(() => {
          this.storage.ref(path).delete();
          this.snackBar.open(
            "លុបរូបភាព", "ជោគជ័យ",
            { duration: 2000 }
          );
        })
      }
    });
  }

  create(f: any) {
    if (this.form.valid) {
      let { verdict_no, judge, judge_ask_date, judgment_writer, judgment_writer_date } = f;
      const formData: IVerdict = {
        key: this.data.key,
        crime: this.data.crime,
        verdict_no: verdict_no,
        judge: judge,
        judge_ask_date: judge_ask_date,
        judge_ask_date_key: ConvertService.toDateKey(judge_ask_date),
        judgment_writer: judgment_writer,
        judgment_writer_date: judgment_writer_date,
        judgment_writer_date_key: ConvertService.toDateKey(judgment_writer_date),
        update_date: new Date(),
        update_by: this.env.user,
      }
      this.store.update(formData, this.selectedFiles, (success, error) => {
        if (success) {
          this.dialogRef.close();
          this.snackBar.open('កែប្រែទិន្នន័យបានបញ្ចប់', 'ជោគជ័យ', { duration: 5000 });
          this.form.reset();
        }
        else {
          alert(error)
        }
      })
    }
  }

}
