import { Routes , Router} from '@angular/router';
import { authGuard } from './core/guards/auth.guard-guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersWalletsComponent } from './pages/users-wallets/users-wallets';
import { TransactionsComponent } from './pages/transactions/transactions/transactions'; 
import { VendorsWalletsComponent } from './pages/vendors-wallets/vendors-wallets';
import { UserProfileComponent } from './pages/users-wallets/user-profile/user-profile';
import { AuthService } from './core/services/auth.service';
import { inject } from '@angular/core';



const initialRouteGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userType = authService.getUserType();

  if (userType === 'vendors') {
    return router.createUrlTree(['/app/transactions']);
  }
  return router.createUrlTree(['/app/users']);
};

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'app',
    component: MainLayoutComponent,
    canActivate: [authGuard], 
    children: [
      // 1. Move the dynamic redirect to the TOP of the children
      { 
        path: '', 
        pathMatch: 'full',
        redirectTo: () => {
          const userType = localStorage.getItem('user_type');
          console.log('Redirecting user type:', userType); // Debug log
          return userType === 'vendors' ? 'transactions' : 'users';
        }
      },
      // 2. Other routes follow
      { path: 'users', component: UsersWalletsComponent },
      { path: 'transactions', component: TransactionsComponent }, 
      { path: 'vendors', component: VendorsWalletsComponent },
      { path: 'users/profile/:id', component: UserProfileComponent },
      { path: 'my-wallet', component: VendorsWalletsComponent, data: { role: 'vendor' } },
    ],
  },
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: '**', redirectTo: 'app' } 
];