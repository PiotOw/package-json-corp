import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosestDeliveryComponent } from './closest-delivery.component';

describe('ClosestDeliveryComponent', () => {
  let component: ClosestDeliveryComponent;
  let fixture: ComponentFixture<ClosestDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosestDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosestDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
