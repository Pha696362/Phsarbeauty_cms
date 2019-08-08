import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVictimsComponent } from './edit-victims.component';

describe('EditVictimsComponent', () => {
  let component: EditVictimsComponent;
  let fixture: ComponentFixture<EditVictimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVictimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVictimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
