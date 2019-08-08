import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticSubCategoryComponent } from './statistic-sub-category.component';

describe('StatisticSubCategoryComponent', () => {
  let component: StatisticSubCategoryComponent;
  let fixture: ComponentFixture<StatisticSubCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticSubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
