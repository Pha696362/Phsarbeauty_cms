import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVictimsComponent } from './add-victims.component';

describe('AddVictimsComponent', () => {
  let component: AddVictimsComponent;
  let fixture: ComponentFixture<AddVictimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVictimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVictimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
