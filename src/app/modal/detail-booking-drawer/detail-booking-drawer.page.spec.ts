import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailBookingDrawerPage } from './detail-booking-drawer.page';

describe('DetailBookingDrawerPage', () => {
  let component: DetailBookingDrawerPage;
  let fixture: ComponentFixture<DetailBookingDrawerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailBookingDrawerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
