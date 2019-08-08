import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesVictimsComponent } from './vehicles-victims.component';

describe('VehiclesVictimsComponent', () => {
  let component: VehiclesVictimsComponent;
  let fixture: ComponentFixture<VehiclesVictimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclesVictimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesVictimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
