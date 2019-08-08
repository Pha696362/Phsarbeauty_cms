import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehiclesExhibitsComponent } from './add-vehicles-exhibits.component';

describe('AddVehiclesExhibitsComponent', () => {
  let component: AddVehiclesExhibitsComponent;
  let fixture: ComponentFixture<AddVehiclesExhibitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVehiclesExhibitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVehiclesExhibitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
