import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentDetailPage } from './payment-detail.page';

describe('PaymentDetailPage', () => {
  let component: PaymentDetailPage;
  let fixture: ComponentFixture<PaymentDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaymentDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
