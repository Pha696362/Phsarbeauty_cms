import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeProfileComponent } from './crime-profile.component';

describe('CrimeProfileComponent', () => {
  let component: CrimeProfileComponent;
  let fixture: ComponentFixture<CrimeProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
