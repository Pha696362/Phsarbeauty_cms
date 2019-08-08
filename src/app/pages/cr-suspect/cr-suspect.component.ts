import { Component, OnInit } from '@angular/core';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-cr-suspect',
  templateUrl: './cr-suspect.component.html',
  styleUrls: ['./cr-suspect.component.scss']
})
export class CrSuspectComponent implements OnInit {

  constructor(
    public ps:PrintService,
  ) { }

  ngOnInit() {
  }
  print(){
    this.ps.print('#print', 'a4l')
  }

}
