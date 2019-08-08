import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-crime-general',
  templateUrl: './crime-general.component.html',
  styleUrls: ['./crime-general.component.scss']
})
export class CrimeGeneralComponent implements OnInit {
  @Input() data:any;
  constructor() { }

  ngOnInit() {
  }

}
