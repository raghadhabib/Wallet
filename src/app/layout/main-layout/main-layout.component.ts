// src/app/layout/main-layout/main-layout.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// بما أنك استخدمت <app-header> في الـ HTML الخاص بالـ Layout، 
// يجب عليك استيراد HeaderComponent هنا ليعرفه Angular
import { HeaderComponent } from '../header/header'; 

@Component({
  selector: 'app-main-layout',
  // يجب إضافة المكونات التي يستخدمها هذا الـ Component هنا (Header و RouterOutlet)
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    HeaderComponent // ⬅️ استيراد الهيدر هنا
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  // لا تحتاج إلى أي منطق (Logic) أو متغيرات هنا حاليًا.
  // يمكن أن تضيف أي منطق عام (مثل التعامل مع الـ Sidebar أو الـ Footer) لاحقًا.
}