import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Crime } from 'src/app/stores/crime.store';

@Component({
  selector: 'app-crime-overview',
  templateUrl: './crime-overview.component.html',
  styleUrls: ['./crime-overview.component.scss']
})
export class CrimeOverviewComponent implements OnInit {

  id;
  constructor(
    public route: ActivatedRoute,
    public store: Crime,
    
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(param=>{
      this.id = param.id;
    })
  }

}
