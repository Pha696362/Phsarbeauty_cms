import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-suspect',
  templateUrl: './profile-suspect.component.html',
  styleUrls: ['./profile-suspect.component.scss']
})
export class ProfileSuspectComponent implements OnInit {

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
