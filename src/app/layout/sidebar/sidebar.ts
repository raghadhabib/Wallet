import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})

export class SidebarComponent implements OnInit {
  isVendor: boolean = false;

   navItems = [
    { name: 'Users & Wallets', icon: 'person_outline', route: '/app/users' },
    { name: 'Transactions', icon: 'compare_arrows', route: '/app/transactions' },
    { name: 'Vendors & Wallets', icon: 'account_balance_wallet', route: '/app/vendors' },
  ];

  ngOnInit() {
    // Check user type from localStorage
    const userType = localStorage.getItem('user_type');
    this.isVendor = userType === 'vendors'; // Adjust string based on your API response
    
    this.setupMenu();
  }
  setupMenu() {
    if (this.isVendor) {
      this.navItems = [
        { name: 'Transactions', icon: 'compare_arrows', route: '/app/transactions' },
        { name: 'Your Wallet', icon: 'account_balance_wallet', route: '/app/vendors' },
      ];
    } else {
      // Standard Admin/Employee Menu
      this.navItems = [
        { name: 'Users & Wallets', icon: 'person_outline', route: '/app/users' },
        { name: 'Transactions', icon: 'compare_arrows', route: '/app/transactions' },
        { name: 'Vendors & Wallets', icon: 'account_balance_wallet', route: '/app/vendors' },
      ];
    }}


 

  constructor(private authService: AuthService, private router: Router) {}


onLogout(): void {

  this.authService.logout();

this.router.navigate(['/login']); 
}
}