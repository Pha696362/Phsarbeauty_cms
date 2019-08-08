import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVictimsComponent } from './profile-victims.component';

describe('ProfileVictimsComponent', () => {
  let component: ProfileVictimsComponent;
  let fixture: ComponentFixture<ProfileVictimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileVictimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileVictimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
