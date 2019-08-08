import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgmentWriterComponent } from './judgment-writer.component';

describe('JudgmentWriterComponent', () => {
  let component: JudgmentWriterComponent;
  let fixture: ComponentFixture<JudgmentWriterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgmentWriterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgmentWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
