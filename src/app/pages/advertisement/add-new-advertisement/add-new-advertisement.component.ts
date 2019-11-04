import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Bookstore } from 'src/app/stores/bookstore';
import { DataService } from 'src/app/services/data.service';
import { IAdvertise } from 'src/app/interfaces/bookstore';
import {  PAYMENT_TYPES, Advertise_Status } from 'src/app/dummy/status';
import { ConvertService } from 'src/app/services/convert.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { checkExistDoc } from 'src/app/services/fire-validators.service';
import { FilemanagerComponent } from '../../filemanager/filemanager.component';
import { AdvertiseimageComponent } from '../../advertiseimage/advertiseimage.component';


@Component({
  selector: 'app-add-new-advertisement',
  templateUrl: './add-new-advertisement.component.html',
  styleUrls: ['./add-new-advertisement.component.scss']
})
export class AddNewAdvertisementComponent implements OnInit {
  disableBtn;
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  category: AbstractControl;
  advertiseType: AbstractControl;
  category_lists = [];
  paymentData=Advertise_Status;
  fileurl;
  constructor(
    public dialogRef: MatDialogRef<AddNewAdvertisementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store:Bookstore,
    private afs:AngularFirestore,
    private ds:DataService,
    private dialog: MatDialog,
 
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required]),checkExistDoc(this.afs,"courses","name")],
      category: [null,],
      advertiseType: [null,],
    })
    this.name = this.form.controls['name'];
    this.advertiseType = this.form.controls['advertiseType']
    this.category = this.form.controls['category'];
  }
  async ngOnInit() {
    this.buildForm();
    this.category_lists = await this.store.fetchCategory();
    this.category.patchValue(this.category_lists[0]);
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }

  create(f: any, isNew) {
   
    if (this.form.valid) {
      this.form.disable();
      const {name, advertiseType}=f;
      const advertiseTypeKey=advertiseType.map(m=>(m.key));
      const item: IAdvertise = {
        key: this.ds.createId(),
        name: name,
        fileurl:this.fileurl?this.fileurl:null,
        advertiseType:advertiseType,
        advertiseTypeKey:advertiseTypeKey,
        create_date: new Date(),
        create_by: this.env.users,
        page_key:ConvertService.pageKey(),
        update_date: new Date(),
        update_by: this.env.users,
      }
      this.store.addNew(this.ds.advertiseRef(),item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Advertisement has been created.', 'done', { duration: 2500 });
          this.form.enable();
          this.form.reset();
          // this.inputEl.nativeElement.focus();
        }
        else {
          alert(error)
        }
      })
    }
  }

  showFileManager() {
    // this.disableBtn = true
    let dialogRef = this.dialog.open(AdvertiseimageComponent, {
      data: null,
      panelClass: 'cs-overlay-panel',
      width: '60vw',
      height: '100vh',
      disableClose: true,
      role: 'dialog',
      hasBackdrop: false,
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
      // const range = this.quillEditorRef.getSelection(true);
      if (result) {
        for (const file of result) {
          // console.log(file.url)
          this.fileurl= file.url
          // this.quillEditorRef.insertEmbed(range.index, 'image', file.url, 'user')
        }
      }


      // this.disableBtn = false;
    });
  }

  

}
