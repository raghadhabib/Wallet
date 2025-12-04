import { Routes } from '@angular/router'; 
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
 
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 


  { path: 'login', component: LoginComponent },
    

  {
    path: 'app', 
    component: MainLayoutComponent,
    children: [
      // any protected routes can go here
    ]
  },
];