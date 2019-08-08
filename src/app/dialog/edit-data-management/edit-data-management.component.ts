import { Management } from './../../stores/management.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { IData } from './../../interfaces/geo';
import { status } from './../../dummy/stauts';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FireValidatorsService } from '../../services/fire-validators.service';
import { Category } from 'src/app/stores/category.store';
import { Environment } from 'src/app/stores/environment.store';

@Component({
  selector: 'app-edit-data-management',
  templateUrl: './edit-data-management.component.html',
  styleUrls: ['./edit-data-management.component.scss']
})
export class EditDataManagementComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  id:any;
  form: FormGroup
  name: AbstractControl
  description: AbstractControl
  msg: any;
  process;
  constructor(
    public dialogRef: MatDialogRef<EditDataManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public store: Management,
    public category:Category,
  ) { }

  buildForm(): void {
    const {name,description}=this.data;
    const item=this.name
    this.form = this.fb.group({
      name: [name, Validators.compose([Validators.required])],
      description: [description],
    })
    this.name = this.form.controls['name'];
    this.description = this.form.controls['description'];
  }

  ngOnInit() {
    this.buildForm();
    this.msg = this.data;
  }

  onClose(){
    this.dialogRef.close()
  }

  create(f: any) {
    if (this.form.valid) {
      // this.form.disable();
      const { name, description } = f;
      const {dbName}=this.data;
      const subcategory = {
        key:this.data.key,
        name: name,
        description: description,
        update_date: new Date(),
        update_by: this.env.user,
      };

      this.store.update(dbName,subcategory, (success, res) => {
        if (success) {
          this.dialogRef.close();
          this.snackBar.open(
            "Update successfully.",
            "done", 
            { duration: 2000 }
          );
          // this.form.enable();
          // this.inputEl.nativeElement.focus();
        } else {
          this.snackBar.open(res, "Error");
          this.form.enable();
        }
      });

    }
  }


}
