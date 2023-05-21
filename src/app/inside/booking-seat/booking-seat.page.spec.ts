import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingSeatPage } from './booking-seat.page';

describe('BookingSeatPage', () => {
  let component: BookingSeatPage;
  let fixture: ComponentFixture<BookingSeatPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BookingSeatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
