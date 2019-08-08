import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeJudgmentListingComponent } from './crime-judgment-listing.component';

describe('CrimeJudgmentListingComponent', () => {
  let component: CrimeJudgmentListingComponent;
  let fixture: ComponentFixture<CrimeJudgmentListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeJudgmentListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeJudgmentListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
