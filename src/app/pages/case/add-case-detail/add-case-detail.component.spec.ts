import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCaseDetailComponent } from './add-case-detail.component';

describe('AddCaseDetailComponent', () => {
  let component: AddCaseDetailComponent;
  let fixture: ComponentFixture<AddCaseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCaseDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
