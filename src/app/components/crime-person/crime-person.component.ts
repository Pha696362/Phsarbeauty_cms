import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-crime-person',
  templateUrl: './crime-person.component.html',
  styleUrls: ['./crime-person.component.scss']
})
export class CrimePersonComponent implements OnInit {
  @Input() iconCss: string = "";
  @Input() title: string;
  @Input() data: any;

  constructor() { }

  ngOnInit() { }

}
