import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview-crime',
  templateUrl: './overview-crime.component.html',
  styleUrls: ['./overview-crime.component.scss']
})
export class OverviewCrimeComponent implements OnInit {
  id;
  constructor(
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(param=>{
      this.id = param.id;
    })
  }

}
