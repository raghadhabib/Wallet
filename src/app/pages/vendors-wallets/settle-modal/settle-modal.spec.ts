import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettleModal } from './settle-modal';

describe('SettleModal', () => {
  let component: SettleModal;
  let fixture: ComponentFixture<SettleModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettleModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettleModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
