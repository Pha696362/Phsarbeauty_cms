import { Component, OnInit } from '@angular/core';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-cr-victim',
  templateUrl: './cr-victim.component.html',
  styleUrls: ['./cr-victim.component.scss']
})
export class CrVictimComponent implements OnInit {

  constructor(public ps:PrintService) { }

  ngOnInit() {
  }

  print(){
    this.ps.print('#print', 'a4l')
  }
}
