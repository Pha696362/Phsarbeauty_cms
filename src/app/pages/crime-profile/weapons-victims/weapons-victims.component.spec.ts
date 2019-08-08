import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponsVictimsComponent } from './weapons-victims.component';

describe('WeaponsVictimsComponent', () => {
  let component: WeaponsVictimsComponent;
  let fixture: ComponentFixture<WeaponsVictimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeaponsVictimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponsVictimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
