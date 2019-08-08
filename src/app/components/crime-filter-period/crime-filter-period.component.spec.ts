import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeFilterPeriodComponent } from './crime-filter-period.component';

describe('CrimeFilterPeriodComponent', () => {
  let component: CrimeFilterPeriodComponent;
  let fixture: ComponentFixture<CrimeFilterPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeFilterPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeFilterPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
