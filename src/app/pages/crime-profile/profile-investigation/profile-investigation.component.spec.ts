import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInvestigationComponent } from './profile-investigation.component';

describe('ProfileInvestigationComponent', () => {
  let component: ProfileInvestigationComponent;
  let fixture: ComponentFixture<ProfileInvestigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInvestigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
