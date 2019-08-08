import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewCrimeAboutComponent } from './overview-crime-about.component';

describe('OverviewCrimeAboutComponent', () => {
  let component: OverviewCrimeAboutComponent;
  let fixture: ComponentFixture<OverviewCrimeAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewCrimeAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewCrimeAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
