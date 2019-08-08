import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeJudgmentDisplayComponent } from './crime-judgment-display.component';

describe('CrimeJudgmentDisplayComponent', () => {
  let component: CrimeJudgmentDisplayComponent;
  let fixture: ComponentFixture<CrimeJudgmentDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeJudgmentDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeJudgmentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
