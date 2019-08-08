import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimePropertyComponent } from './crime-property.component';

describe('CrimePropertyComponent', () => {
  let component: CrimePropertyComponent;
  let fixture: ComponentFixture<CrimePropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimePropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
