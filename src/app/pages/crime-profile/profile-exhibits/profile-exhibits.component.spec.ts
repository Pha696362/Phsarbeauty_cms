import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileExhibitsComponent } from './profile-exhibits.component';

describe('ProfileExhibitsComponent', () => {
  let component: ProfileExhibitsComponent;
  let fixture: ComponentFixture<ProfileExhibitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileExhibitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileExhibitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
