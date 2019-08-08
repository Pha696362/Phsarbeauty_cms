import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-crime-judgment-display',
  templateUrl: './crime-judgment-display.component.html',
  styleUrls: ['./crime-judgment-display.component.scss']
})
export class CrimeJudgmentDisplayComponent implements OnInit {
  @Input() iconCss: string = "";
  @Input() title: string;
  @Input() data: any;
  
  constructor() { }

  ngOnInit() {
  }

}
