import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsWallets } from './vendors-wallets';

describe('VendorsWallets', () => {
  let component: VendorsWallets;
  let fixture: ComponentFixture<VendorsWallets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorsWallets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorsWallets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
