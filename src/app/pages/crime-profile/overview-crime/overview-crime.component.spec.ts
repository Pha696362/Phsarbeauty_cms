import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewCrimeComponent } from './overview-crime.component';

describe('OverviewCrimeComponent', () => {
  let component: OverviewCrimeComponent;
  let fixture: ComponentFixture<OverviewCrimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewCrimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewCrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
