import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdictFileComponent } from './verdict-file.component';

describe('VerdictFileComponent', () => {
  let component: VerdictFileComponent;
  let fixture: ComponentFixture<VerdictFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerdictFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdictFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
