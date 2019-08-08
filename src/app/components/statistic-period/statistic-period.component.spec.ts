import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticPeriodComponent } from './statistic-period.component';

describe('StatisticPeriodComponent', () => {
  let component: StatisticPeriodComponent;
  let fixture: ComponentFixture<StatisticPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
