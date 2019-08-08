import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { ActivatedRoute } from '@angular/router';
import { Crime } from 'src/app/stores/crime.store';
import { MatDialog } from '@angular/material';
import { CloseCrimeCaseComponent } from 'src/app/components/close-crime-case/close-crime-case.component';

@Component({
  selector: 'app-crime-profile',
  templateUrl: './crime-profile.component.html',
  styleUrls: ['./crime-profile.component.scss']
})
export class CrimeProfileComponent implements OnInit {
  tabs = tabs.crimeprofile;
  crimeTabs;
  crimeKey: string;
  constructor(
    public route: ActivatedRoute,
    public store: Crime,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.crimeKey = param.id;
      this.crimeTabs = this.tabs.map(f => ({ path: f.path1 + param.id + f.path2, label: f.label }));
      this.store.fetchCrimeDoc(param.id);
      this.store.fetchCrimePersonFile(param.id);
      this.store.fetchCrimeJudgmentFile(param.id);
    })
  }

  closeCrime() {
    if (!this.store.selectedCrime) return;
    let dialogRef = this.dialog.open(CloseCrimeCaseComponent, {
      data: this.store.selectedCrime,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

}
