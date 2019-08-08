import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehiclesVictimsComponent } from './add-vehicles-victims.component';

describe('AddVehiclesVictimsComponent', () => {
  let component: AddVehiclesVictimsComponent;
  let fixture: ComponentFixture<AddVehiclesVictimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVehiclesVictimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVehiclesVictimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
