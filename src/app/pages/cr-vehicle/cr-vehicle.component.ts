import { Component, OnInit } from '@angular/core';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-cr-vehicle',
  templateUrl: './cr-vehicle.component.html',
  styleUrls: ['./cr-vehicle.component.scss']
})
export class CrVehicleComponent implements OnInit {

  constructor(public ps:PrintService) { }

  ngOnInit() {
  }

  print(){
    this.ps.print('#print', 'a4l')
  }
}
