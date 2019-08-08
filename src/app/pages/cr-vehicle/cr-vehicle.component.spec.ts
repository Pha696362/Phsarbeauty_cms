import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrVehicleComponent } from './cr-vehicle.component';

describe('CrVehicleComponent', () => {
  let component: CrVehicleComponent;
  let fixture: ComponentFixture<CrVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
