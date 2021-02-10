import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLimitsComponent } from './payment-limits.component';

describe('PaymentLimitsComponent', () => {
  let component: PaymentLimitsComponent;
  let fixture: ComponentFixture<PaymentLimitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentLimitsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
