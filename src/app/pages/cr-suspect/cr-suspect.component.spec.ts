import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrSuspectComponent } from './cr-suspect.component';

describe('CrSuspectComponent', () => {
  let component: CrSuspectComponent;
  let fixture: ComponentFixture<CrSuspectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrSuspectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrSuspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
