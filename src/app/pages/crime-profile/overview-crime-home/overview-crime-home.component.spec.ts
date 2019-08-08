import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewCrimeHomeComponent } from './overview-crime-home.component';

describe('OverviewCrimeHomeComponent', () => {
  let component: OverviewCrimeHomeComponent;
  let fixture: ComponentFixture<OverviewCrimeHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewCrimeHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewCrimeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
