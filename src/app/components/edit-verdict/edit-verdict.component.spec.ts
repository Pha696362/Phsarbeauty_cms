import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVerdictComponent } from './edit-verdict.component';

describe('EditVerdictComponent', () => {
  let component: EditVerdictComponent;
  let fixture: ComponentFixture<EditVerdictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVerdictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVerdictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
