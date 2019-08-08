import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVerdictComponent } from './add-verdict.component';

describe('AddVerdictComponent', () => {
  let component: AddVerdictComponent;
  let fixture: ComponentFixture<AddVerdictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVerdictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVerdictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
