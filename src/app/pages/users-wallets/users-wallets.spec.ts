import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersWalletsComponent } from './users-wallets';

describe('UsersWallets', () => {
  let component: UsersWalletsComponent;
  let fixture: ComponentFixture<UsersWalletsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersWalletsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
