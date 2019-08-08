import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-investigation',
  templateUrl: './profile-investigation.component.html',
  styleUrls: ['./profile-investigation.component.scss']
})
export class ProfileInvestigationComponent implements OnInit {

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
