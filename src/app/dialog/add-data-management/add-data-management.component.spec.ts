import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataManagementComponent } from './add-data-management.component';

describe('AddDataManagementComponent', () => {
  let component: AddDataManagementComponent;
  let fixture: ComponentFixture<AddDataManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDataManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDataManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
