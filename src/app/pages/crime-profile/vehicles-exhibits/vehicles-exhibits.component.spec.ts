import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesExhibitsComponent } from './vehicles-exhibits.component';

describe('VehiclesExhibitsComponent', () => {
  let component: VehiclesExhibitsComponent;
  let fixture: ComponentFixture<VehiclesExhibitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclesExhibitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesExhibitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
