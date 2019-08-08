import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeFilterCategoryComponent } from './crime-filter-category.component';

describe('CrimeFilterCategoryComponent', () => {
  let component: CrimeFilterCategoryComponent;
  let fixture: ComponentFixture<CrimeFilterCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeFilterCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeFilterCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
