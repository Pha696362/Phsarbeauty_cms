import { ActivatedRoute } from '@angular/router';
import { AddCrimeStore } from './../../../stores/add-crime.store';
import { ECrime } from './../../../stores/ecrime.store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-crime-record',
  templateUrl: './new-crime-record.component.html',
  styleUrls: ['./new-crime-record.component.scss']
})
export class NewCrimeRecordComponent implements OnInit {
  crimeId: string;
  communeId: string;
  constructor(public store: ECrime,
    public route: ActivatedRoute,
    public crime: AddCrimeStore) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.crimeId = param.cid;
      this.communeId = param.id;
      this.crime.crimeId=this.crimeId;
      this.crime.communeId=this.communeId;
    })
  }

}
