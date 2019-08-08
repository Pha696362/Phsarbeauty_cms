import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeOverviewListingComponent } from './crime-overview-listing.component';

describe('CrimeOverviewListingComponent', () => {
  let component: CrimeOverviewListingComponent;
  let fixture: ComponentFixture<CrimeOverviewListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeOverviewListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeOverviewListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
