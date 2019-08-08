import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-victims',
  templateUrl: './profile-victims.component.html',
  styleUrls: ['./profile-victims.component.scss']
})
export class ProfileVictimsComponent implements OnInit {

  id;
  constructor(
    public route: ActivatedRoute,
    
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(param=>{
      this.id = param.id;
    })
  }

}
