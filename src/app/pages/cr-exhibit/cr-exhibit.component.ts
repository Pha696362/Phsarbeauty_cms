import { Component, OnInit } from '@angular/core';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-cr-exhibit',
  templateUrl: './cr-exhibit.component.html',
  styleUrls: ['./cr-exhibit.component.scss']
})
export class CrExhibitComponent implements OnInit {

  constructor(public ps:PrintService) { }

  ngOnInit() {
  }
  print(){
    this.ps.print('#print', 'a4l')
  }
}
