import { Component, OnInit } from '@angular/core';
import { PrintService } from 'src/app/services/print.service';
import { Crime } from 'src/app/stores/crime.store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crimial-siuation',
  templateUrl: './crimial-siuation.component.html',
  styleUrls: ['./crimial-siuation.component.scss']
})
export class CrimialSiuationComponent implements OnInit {
  id;
  constructor(
    public ps:PrintService,
    public store: Crime,
    public route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(param=>{
      this.id = param.id;
      this.store.fetchCrimeDoc(this.id);
    })
  }

  print(){
    this.ps.print('#print', 'a4l')
  }

  onClick(){}

}
