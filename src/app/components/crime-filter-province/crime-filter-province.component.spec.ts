import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeFilterProvinceComponent } from './crime-filter-province.component';

describe('CrimeFilterProvinceComponent', () => {
  let component: CrimeFilterProvinceComponent;
  let fixture: ComponentFixture<CrimeFilterProvinceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeFilterProvinceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeFilterProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
