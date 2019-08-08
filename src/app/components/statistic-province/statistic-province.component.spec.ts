import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticProvinceComponent } from './statistic-province.component';

describe('StatisticProvinceComponent', () => {
  let component: StatisticProvinceComponent;
  let fixture: ComponentFixture<StatisticProvinceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticProvinceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
