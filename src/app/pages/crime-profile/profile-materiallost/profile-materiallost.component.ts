import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-materiallost',
  templateUrl: './profile-materiallost.component.html',
  styleUrls: ['./profile-materiallost.component.scss']
})
export class ProfileMateriallostComponent implements OnInit {

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
