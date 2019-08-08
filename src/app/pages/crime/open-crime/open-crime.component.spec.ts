import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCrimeComponent } from './open-crime.component';

describe('OpenCrimeComponent', () => {
  let component: OpenCrimeComponent;
  let fixture: ComponentFixture<OpenCrimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenCrimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
