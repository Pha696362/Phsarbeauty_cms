import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Environment } from 'src/app/stores/environment.store';
import { Crime } from 'src/app/stores/crime.store';
import { DataService } from 'src/app/services/data.service';
import { recordStatus } from 'src/app/dummy/stauts';
import { ConvertService } from 'src/app/services/convert.service';

@Component({
  selector: 'app-add-investigation',
  templateUrl: './add-investigation.component.html',
  styleUrls: ['./add-investigation.component.scss']
})
export class AddInvestigationComponent implements OnInit {

  form:FormGroup;
  name: AbstractControl;

  role:AbstractControl;
  phone_number:AbstractControl;

  note:AbstractControl;

  
  constructor(
    public dialogRef: MatDialogRef<AddInvestigationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public env: Environment,
    public store: Crime,
    private ds: DataService,

  ) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm(): void {
    this.form = this.fb.group({
      name: [null],
      role: [null],
      phone_number: [null],
      note: [null]
    })

    this.name = this.form.controls['name'];
    this.role = this.form.controls['role'];

    this.phone_number = this.form.controls['role'];
    this.note = this.form.controls['note'];
    if(this.data.type.key == 2){
      this.form.controls['name'].setValidators(Validators.required);
      this.form.controls['role'].setValidators(Validators.required);
      this.form.controls['phone_number'].setValidators(Validators.required);
    }else{
      this.form.controls['name'].setValidators(null);
      this.form.controls['role'].setValidators(null);
      this.form.controls['phone_number'].setValidators(null);
    }
    if(this.data.type.key == 1){
      this.form.controls['note'].setValidators(Validators.required);
    }else{
      this.form.controls['note'].setValidators(null);
    }
  }

  create(f: any){
    if (this.form.valid) {
      this.form.disable();

      const item: any = {
        key: this.ds.createId(),
        crime_key: this.data.item.key,
        type: this.data.type,
       
        name:f.name,
        role:f.role,
        phone_number:f.phone_number,
        note:f.note,
        status: recordStatus.active,
        page_key: ConvertService.pageKey(),
        create_date: new Date(),
        create_by: this.env.user,
      }
      this.store.addNewinvestigation(item, (success, error) => {
        if (success) {
          this.form.enable();
          this.snackBar.open('Investigation crime has been created.', 'done', { duration: 2000 });
          this.dialogRef.close()

        } else {
          this.form.enable();
          this.snackBar.open(error, 'Error');
        }
      })
    }
  }
}
