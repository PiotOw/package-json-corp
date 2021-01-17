import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewLabelDialogComponent } from './add-new-label-dialog.component';

describe('AddNewLabelDialogComponent', () => {
  let component: AddNewLabelDialogComponent;
  let fixture: ComponentFixture<AddNewLabelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewLabelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewLabelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
