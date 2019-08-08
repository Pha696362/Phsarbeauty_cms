import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrAddInformationComponent } from './cr-add-information.component';

describe('CrAddInformationComponent', () => {
  let component: CrAddInformationComponent;
  let fixture: ComponentFixture<CrAddInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrAddInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrAddInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
