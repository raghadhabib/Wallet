import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  // صفحة الدخول تكون منفصلة (بدون Layout الهيدر)
  { 
    path: 'login', 
    component: LoginComponent 
  },
  
  // باقي الصفحات تكون داخل الـ Layout
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // { path: 'dashboard', component: DashboardComponent }, // مثال
    ]
  },
  
  // تحويل الرابط الفارغ إلى اللوجن
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];