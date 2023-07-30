import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyNotificationPage } from './verify-notification.page';

describe('VerifyNotificationPage', () => {
  let component: VerifyNotificationPage;
  let fixture: ComponentFixture<VerifyNotificationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerifyNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
