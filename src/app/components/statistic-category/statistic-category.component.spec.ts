import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticCategoryComponent } from './statistic-category.component';

describe('StatisticCategoryComponent', () => {
  let component: StatisticCategoryComponent;
  let fixture: ComponentFixture<StatisticCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
