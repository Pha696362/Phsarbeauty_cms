import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSceneComponent } from './location-scene.component';

describe('LocationSceneComponent', () => {
  let component: LocationSceneComponent;
  let fixture: ComponentFixture<LocationSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
