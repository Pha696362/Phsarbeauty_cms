import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDataManagementComponent } from './edit-data-management.component';

describe('EditDataManagementComponent', () => {
  let component: EditDataManagementComponent;
  let fixture: ComponentFixture<EditDataManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDataManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDataManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
