import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AkunPage } from './akun.page';

describe('AkunPage', () => {
  let component: AkunPage;
  let fixture: ComponentFixture<AkunPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AkunPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
