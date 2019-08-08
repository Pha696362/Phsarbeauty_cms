import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crime-judgment',
  templateUrl: './crime-judgment.component.html',
  styleUrls: ['./crime-judgment.component.scss']
})
export class CrimeJudgmentComponent implements OnInit {

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
