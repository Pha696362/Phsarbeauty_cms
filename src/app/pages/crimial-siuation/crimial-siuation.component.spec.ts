import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimialSiuationComponent } from './crimial-siuation.component';

describe('CrimialSiuationComponent', () => {
  let component: CrimialSiuationComponent;
  let fixture: ComponentFixture<CrimialSiuationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimialSiuationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimialSiuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
