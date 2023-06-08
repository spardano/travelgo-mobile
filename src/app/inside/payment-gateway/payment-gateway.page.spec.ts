import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentGatewayPage } from './payment-gateway.page';

describe('PaymentGatewayPage', () => {
  let component: PaymentGatewayPage;
  let fixture: ComponentFixture<PaymentGatewayPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaymentGatewayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
