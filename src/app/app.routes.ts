import { Routes } from '@angular/router'; 
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard-guard';
import { UsersWalletsComponent } from './pages/users-wallets/users-wallets';

export const routes: Routes = [
 
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 


  { path: 'login', component: LoginComponent },
    

  {
    path: 'app', 
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      // any protected routes can go here
      { 
        path: 'users', 
        component: UsersWalletsComponent // المسار سيكون /app/users
      },
      { 
        path: '', 
        redirectTo: 'users', 
        pathMatch: 'full' 
      },
    ]
  },
];