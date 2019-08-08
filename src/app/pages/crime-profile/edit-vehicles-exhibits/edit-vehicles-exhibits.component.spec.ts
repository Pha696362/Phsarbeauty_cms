import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehiclesExhibitsComponent } from './edit-vehicles-exhibits.component';

describe('EditVehiclesExhibitsComponent', () => {
  let component: EditVehiclesExhibitsComponent;
  let fixture: ComponentFixture<EditVehiclesExhibitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVehiclesExhibitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVehiclesExhibitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
