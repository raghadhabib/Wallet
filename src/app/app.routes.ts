// src/app/app.routes.ts
// src/app/app.routes.ts

import { Routes } from '@angular/router'; // ⬅️ تأكد من وجود هذا السطر
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
// ...
export const routes: Routes = [
  // 1. يجب أن يكون هذا المسار أولاً: إعادة التوجيه إلى 'login'
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 

  // 2. صفحة الدخول
  { path: 'login', component: LoginComponent },
    
  // 3. باقي الصفحات (يجب وضعها تحت مسار مختلف مثل 'app')
  {
    path: 'app', // ⬅️ هام: يجب تغيير هذا المسار
    component: MainLayoutComponent,
    children: [
      // ... أي صفحات محمية أخرى هنا ...
    ]
  },
];