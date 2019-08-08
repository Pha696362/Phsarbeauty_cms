import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'src/app/stores/person.store';
import { DataService } from 'src/app/services/data.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-verdict-file',
  templateUrl: './verdict-file.component.html',
  styleUrls: ['./verdict-file.component.scss']
})
export class VerdictFileComponent implements OnInit {
  @Input() crime: any;
  constructor(
    public store: Person,
    private ds: DataService,
    private storage: AngularFireStorage,
    public snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
    this.store.fetchVerdictImages(this.crime);
  }

  deleteFile(data: any) {
    const path = `verdict/${this.crime.key}/${data.name}`;
    this.ds.crimeDocRef(this.crime.crime_key).collection('verdict').doc(this.crime.key).collection('files').doc(data.key).delete().then(() => {
      this.storage.ref(path).delete();
      this.snackBar.open(
        "Verdict file has been deleted successfully.",
        "done",
        { duration: 2000 }
      );
    })
  }

  

}
