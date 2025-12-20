import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard-guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersWalletsComponent } from './pages/users-wallets/users-wallets';
import { TransactionsComponent } from './pages/transactions/transactions/transactions'; 
import { VendorsWalletsComponent } from './pages/vendors-wallets/vendors-wallets';
import { UserProfileComponent } from './pages/users-wallets/user-profile/user-profile';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'app',
    component: MainLayoutComponent,
    canActivate: [authGuard], 
    children: [
      { path: 'users', component: UsersWalletsComponent },
      { path: 'transactions', component: TransactionsComponent }, 
      { path: '', redirectTo: 'users', pathMatch: 'full' }, 
      { path: 'vendors', component: VendorsWalletsComponent },
      { path: 'app/users/details/:id', component: UserProfileComponent },
      { path: 'my-wallet', component: VendorsWalletsComponent, data: { role: 'vendor' } },
    ],
  },
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  
 
  { path: '**', redirectTo: 'app' } 
];