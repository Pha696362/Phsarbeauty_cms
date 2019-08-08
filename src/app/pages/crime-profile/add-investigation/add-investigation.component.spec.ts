import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestigationComponent } from './add-investigation.component';

describe('AddInvestigationComponent', () => {
  let component: AddInvestigationComponent;
  let fixture: ComponentFixture<AddInvestigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInvestigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
