import { Category } from './../../stores/category.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { ISubCategory } from './../../interfaces/geo';
import { status } from './../../dummy/stauts';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FireValidatorsService } from '../../services/fire-validators.service';
import { MappingService } from 'src/app/services/mapping.service';
import { Environment } from 'src/app/stores/environment.store';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup
  name: AbstractControl
  description: AbstractControl
  process;
  constructor(
    public dialogRef: MatDialogRef<AddSubCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public store: Category
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required]), FireValidatorsService.checkExist(this.afs, 'geo_provinces', 'name')],
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
      const formData: ISubCategory = {
        key: key,
        name: f.name,
        category:MappingService.subCategoryObj(this.store.selectedCategory),
        description: f.description,
        status: status[0],
        create_date: new Date(),
        create_by: this.env.user,
      }
      this.store.addSubCategory(formData, (success, error) => {
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
