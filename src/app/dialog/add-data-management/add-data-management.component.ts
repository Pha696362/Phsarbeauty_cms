import { Management } from './../../stores/management.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { IData } from './../../interfaces/geo';
import { status } from './../../dummy/stauts';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FireValidatorsService } from '../../services/fire-validators.service';
import { Environment } from 'src/app/stores/environment.store';

@Component({
  selector: 'app-add-data-management',
  templateUrl: './add-data-management.component.html',
  styleUrls: ['./add-data-management.component.scss']
})
export class AddDataManagementComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup
  name: AbstractControl
  description: AbstractControl
  process;
  constructor(
    public dialogRef: MatDialogRef<AddDataManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public store: Management
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      description: [null],
    })
    this.name = this.form.controls['name'];
    this.description = this.form.controls['description'];
  }


  ngOnInit() {
    this.buildForm();
  }

  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const key = this.afs.createId();
      const formData: IData = {
        key: key,
        name: f.name,
        description: f.description,
        status: status[0],
        create_date: new Date(),
        create_by: this.env.user,
      }
      this.store.addItem(this.data.key,formData, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Sub category has been created.', 'done', { duration: 5000 });
          this.form.reset();
          this.form.enable();
          this.inputEl.nativeElement.focus();
        }
        else {
          this.form.enable();
          alert(error)
        }
      })
    }
  }

}
