import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeGeneralComponent } from './crime-general.component';

describe('CrimeGeneralComponent', () => {
  let component: CrimeGeneralComponent;
  let fixture: ComponentFixture<CrimeGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
