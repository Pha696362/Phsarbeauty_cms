import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponsExhibitsComponent } from './weapons-exhibits.component';

describe('WeaponsExhibitsComponent', () => {
  let component: WeaponsExhibitsComponent;
  let fixture: ComponentFixture<WeaponsExhibitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeaponsExhibitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponsExhibitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
