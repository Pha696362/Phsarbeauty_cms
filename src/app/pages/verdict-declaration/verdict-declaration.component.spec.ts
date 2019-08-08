import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdictDeclarationComponent } from './verdict-declaration.component';

describe('VerdictDeclarationComponent', () => {
  let component: VerdictDeclarationComponent;
  let fixture: ComponentFixture<VerdictDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerdictDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdictDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
