import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCrimeUpdateComponent } from './cr-crime-update.component';

describe('CrCrimeUpdateComponent', () => {
  let component: CrCrimeUpdateComponent;
  let fixture: ComponentFixture<CrCrimeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrCrimeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCrimeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
