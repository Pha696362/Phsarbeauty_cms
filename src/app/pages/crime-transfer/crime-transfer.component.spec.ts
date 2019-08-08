import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeTransferComponent } from './crime-transfer.component';

describe('CrimeTransferComponent', () => {
  let component: CrimeTransferComponent;
  let fixture: ComponentFixture<CrimeTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
