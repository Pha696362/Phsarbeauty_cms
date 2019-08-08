import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMateriallostComponent } from './profile-materiallost.component';

describe('ProfileMateriallostComponent', () => {
  let component: ProfileMateriallostComponent;
  let fixture: ComponentFixture<ProfileMateriallostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileMateriallostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMateriallostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
