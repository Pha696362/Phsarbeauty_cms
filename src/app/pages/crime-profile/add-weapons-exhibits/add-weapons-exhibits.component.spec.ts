import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeaponsExhibitsComponent } from './add-weapons-exhibits.component';

describe('AddWeaponsExhibitsComponent', () => {
  let component: AddWeaponsExhibitsComponent;
  let fixture: ComponentFixture<AddWeaponsExhibitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWeaponsExhibitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWeaponsExhibitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
