import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSuspectComponent } from './profile-suspect.component';

describe('ProfileSuspectComponent', () => {
  let component: ProfileSuspectComponent;
  let fixture: ComponentFixture<ProfileSuspectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSuspectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSuspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
