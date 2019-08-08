import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeProfileNavComponent } from './crime-profile-nav.component';

describe('CrimeProfileNavComponent', () => {
  let component: CrimeProfileNavComponent;
  let fixture: ComponentFixture<CrimeProfileNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeProfileNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeProfileNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
