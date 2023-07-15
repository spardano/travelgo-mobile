import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRefundPage } from './form-refund.page';

describe('FormRefundPage', () => {
  let component: FormRefundPage;
  let fixture: ComponentFixture<FormRefundPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormRefundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
