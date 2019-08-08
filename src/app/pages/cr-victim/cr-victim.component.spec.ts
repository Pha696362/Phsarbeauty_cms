import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrVictimComponent } from './cr-victim.component';

describe('CrVictimComponent', () => {
  let component: CrVictimComponent;
  let fixture: ComponentFixture<CrVictimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrVictimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrVictimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
