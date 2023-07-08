import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentCompletePage } from './payment-complete.page';

describe('PaymentCompletePage', () => {
  let component: PaymentCompletePage;
  let fixture: ComponentFixture<PaymentCompletePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaymentCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
