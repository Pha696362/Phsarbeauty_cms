import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Bookstore } from 'src/app/stores/bookstore';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/services/data.service';
import { IContent } from 'src/app/interfaces/bookstore';
import { ConvertService } from 'src/app/services/convert.service';
import { FilemanagerComponent } from '../../filemanager/filemanager.component';
import { Advertise_Status } from 'src/app/dummy/status';
import { AdvertiseimageComponent } from '../../advertiseimage/advertiseimage.component';
import { AddNewContentComponent } from '../add-new-content/add-new-content.component';
import Quill from 'quill'
import ImageResize from 'quill-image-resize-module'

Quill.register('modules/imageResize', ImageResize)
@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent implements OnInit {
  disableBtn;
  tabs = tabs.content
  modules = {}
  quillEditorRef;
  maxUploadFileSize = 1000000;
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  createname: AbstractControl;
  editname: AbstractControl;
  reference: AbstractControl;
  // category: AbstractControl;
  advertiseType: AbstractControl;
  category_lists = [];
  type_lists = [];
  paymentData = Advertise_Status;
  fileurl;
  constructor(
    public dialogRef: MatDialogRef<AddNewContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store: Bookstore,
    private afs: AngularFirestore,
    private ds: DataService,
    private dialog: MatDialog,
  ) {

    this.modules = {
      imageResize: {},
      imageDrop: true,
      syntax: false,
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link', 'video']
      ]
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: [this.data.name],
      createname: [this.data.createname],
      reference: [this.data.reference],
      editname: [this.data.editname],
      description: [this.data.description],
      // category: [null,],
      advertiseType: [this.data.advertiseType],

    })
    this.name = this.form.controls['name'];
    // this.category = this.form.controls['category'];
    this.createname = this.form.controls['createname'];
    this.reference = this.form.controls['reference'];
    this.editname = this.form.controls['editname'];
    this.advertiseType = this.form.controls['advertiseType']
  }

  async ngOnInit() {
    console.log(this.data)
    this.buildForm();
    this.category_lists = await this.store.fetchCategory();
    // this.category.patchValue(this.category_lists[0]);
    this.type_lists = await this.store.fetchTypes();
    // console.log(this.type_lists);
    // this.type.patchValue(this.type_lists[0]);
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }
  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const { advertiseType, name, createname, reference, editname } = f;
      // console.log(advertiseType)

      const advertiseTypeKey = advertiseType ? advertiseType.map(m => (m.key)) : null

      const item: IContent = {
        key: this.data.key,
        name: name,
        editname: editname,
        createname: createname,
        reference: reference,
       
        update_date: new Date(),
        update_by: this.env.users,
        fileurl: this.fileurl ? this.fileurl : null,
        advertiseType: advertiseType,
        advertiseTypeKey: advertiseTypeKey,
      }
      console.log(item)
      this.store.update(this.ds.contentcRef(), item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Content has been update.', 'done', { duration: 2500 });
          this.form.enable();
          this.form.reset();
        }
        else {
          alert(error)
        }
      })
    }
  }

  showFileManager() {
    this.disableBtn = true
    let dialogRef = this.dialog.open(FilemanagerComponent, {
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
      const range = this.quillEditorRef.getSelection(true);
      if (result) {
        for (const file of result) {
          // console.log(file.url)
          this.quillEditorRef.insertEmbed(range.index, 'image', file.url, 'user')
        }
      }

      this.disableBtn = false;
    });
  }

  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
    // console.log(this.quillEditorRef)
    const toolbar = editorInstance.getModule('toolbar');

  }
  addImage() {
    const range = this.quillEditorRef.getSelection(true);

    this.quillEditorRef.insertEmbed(range.index, 'image', 'https://cloud.githubusercontent.com/assets/2264672/20601381/a51753d4-b258-11e6-92c2-1d79efa5bede.png', 'user')
  }
  onContentChanged(editorInstance: any) {
    const range = editorInstance.text;

    var regex = /https?:\/\/[^\s]+/g;

  }

  imageHandler = (image, callback) => {
    const range = this.quillEditorRef.getSelection();
    const img = '<p><img src="https://firebasestorage.googleapis.com/v0/b/puconline-c176c.appspot.com/o/logo%2FLogo-PUC-Final-01.png?alt=media&token=938f845e-a46b-454d-9d9a-69ee2f4c1d03"/></p>';
    this.quillEditorRef.clipboard.dangerouslyPasteHTML(range.index, img);
  }




  //advertisement
  showimage() {
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
          this.fileurl = file.url
          // this.quillEditorRef.insertEmbed(range.index, 'image', file.url, 'user')
        }
      }


      // this.disableBtn = false;
    });
  }



}