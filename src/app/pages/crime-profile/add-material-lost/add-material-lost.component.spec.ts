import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaterialLostComponent } from './add-material-lost.component';

describe('AddMaterialLostComponent', () => {
  let component: AddMaterialLostComponent;
  let fixture: ComponentFixture<AddMaterialLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMaterialLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaterialLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
