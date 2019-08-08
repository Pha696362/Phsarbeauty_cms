import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCrimeRecordComponent } from './new-crime-record.component';

describe('NewCrimeRecordComponent', () => {
  let component: NewCrimeRecordComponent;
  let fixture: ComponentFixture<NewCrimeRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCrimeRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCrimeRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
