import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCrimeComponent } from './add-new-crime.component';

describe('AddNewCrimeComponent', () => {
  let component: AddNewCrimeComponent;
  let fixture: ComponentFixture<AddNewCrimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewCrimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
