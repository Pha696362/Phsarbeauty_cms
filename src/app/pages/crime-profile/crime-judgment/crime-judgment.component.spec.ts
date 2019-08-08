import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeJudgmentComponent } from './crime-judgment.component';

describe('CrimeJudgmentComponent', () => {
  let component: CrimeJudgmentComponent;
  let fixture: ComponentFixture<CrimeJudgmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeJudgmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeJudgmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
