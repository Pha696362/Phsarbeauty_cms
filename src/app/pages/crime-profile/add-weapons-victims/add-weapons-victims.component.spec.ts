import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeaponsVictimsComponent } from './add-weapons-victims.component';

describe('AddWeaponsVictimsComponent', () => {
  let component: AddWeaponsVictimsComponent;
  let fixture: ComponentFixture<AddWeaponsVictimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWeaponsVictimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWeaponsVictimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
