import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-exhibits',
  templateUrl: './profile-exhibits.component.html',
  styleUrls: ['./profile-exhibits.component.scss']
})
export class ProfileExhibitsComponent implements OnInit {

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
