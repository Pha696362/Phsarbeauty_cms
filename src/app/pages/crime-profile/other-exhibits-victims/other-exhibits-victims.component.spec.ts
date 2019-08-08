import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherExhibitsVictimsComponent } from './other-exhibits-victims.component';

describe('OtherExhibitsVictimsComponent', () => {
  let component: OtherExhibitsVictimsComponent;
  let fixture: ComponentFixture<OtherExhibitsVictimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherExhibitsVictimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherExhibitsVictimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
