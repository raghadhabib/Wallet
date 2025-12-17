import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngIf and Pipes
import { UserService } from '../../core/services/user.service';

// Import these Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-vendors-wallets',
  templateUrl: './vendors-wallets.html',
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  styleUrls: ['./vendors-wallets.css']
})
export class VendorsWalletsComponent implements OnInit {
  displayedColumns: string[] = ['users', 'balance', 'actions']; // Matches the image headers
  vendors: any[] = [];
  isLoading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors() {
    this.isLoading = true;
    this.userService.getVendors().subscribe({
      next: (res) => {
        this.vendors = res.data.wallets.data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  onSettleMoney(vendor: any) {
    console.log('Settling money for:', vendor.walletable.name);
  }
}