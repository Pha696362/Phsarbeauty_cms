import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrSuspectDetetionUpdateComponent } from './cr-suspect-detetion-update.component';

describe('CrSuspectDetetionUpdateComponent', () => {
  let component: CrSuspectDetetionUpdateComponent;
  let fixture: ComponentFixture<CrSuspectDetetionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrSuspectDetetionUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrSuspectDetetionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
