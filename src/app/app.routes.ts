import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard-guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersWalletsComponent } from './pages/users-wallets/users-wallets';
import { TransactionsComponent } from './pages/transactions/transactions/transactions'; // ⬅️ استيراد المكون الجديد

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'app',
    component: MainLayoutComponent,
    canActivate: [authGuard], // حماية المسار بـ Guard
    children: [
      { path: 'users', component: UsersWalletsComponent },
      // ⬅️ إضافة مسار المعاملات
      { path: 'transactions', component: TransactionsComponent }, 
      // مسار افتراضي عند الدخول لـ /app
      { path: '', redirectTo: 'users', pathMatch: 'full' }, 
    ],
  },
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: '**', redirectTo: 'app' } // لأي مسار غير معرف
];