import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChooseLocationPage } from './choose-location.page';

describe('ChooseLocationPage', () => {
  let component: ChooseLocationPage;
  let fixture: ComponentFixture<ChooseLocationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChooseLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
