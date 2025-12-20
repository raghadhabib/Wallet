import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessToast } from './success-toast';

describe('SuccessToast', () => {
  let component: SuccessToast;
  let fixture: ComponentFixture<SuccessToast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessToast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessToast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
