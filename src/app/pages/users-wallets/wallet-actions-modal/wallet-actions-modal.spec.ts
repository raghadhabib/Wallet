import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletActionsModal } from './wallet-actions-modal';

describe('WalletActionsModal', () => {
  let component: WalletActionsModal;
  let fixture: ComponentFixture<WalletActionsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletActionsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletActionsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
