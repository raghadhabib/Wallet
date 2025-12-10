import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router'; // للتنقل وتفعيل زر المسار النشط
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  // استيراد CommonModule لأوامر *ngIf/ngFor و RouterLink/RouterLinkActive للتنقل
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {

  // تعريف قائمة الروابط (سنستخدمها لإنشاء الـ Menu)
  navItems = [
    { name: 'Users & Wallets', icon: 'person_outline', route: '/app/users' },
    { name: 'Transactions', icon: 'compare_arrows', route: '/app/transactions' },
    { name: 'Vendors & Wallets', icon: 'account_balance_wallet', route: '/app/vendors' },
  ];

  constructor(private authService: AuthService) {}

  // دالة لتسجيل الخروج (Logout)
  onLogout(): void {
    this.authService.logout();
    // Angular Guard سيقوم بتحويل المستخدم إلى /login بعد مسح التوكن
  }
}