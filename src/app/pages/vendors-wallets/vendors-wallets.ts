import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendors-wallets',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  templateUrl: './vendors-wallets.html',
  styleUrls: ['./vendors-wallets.css']
})
export class VendorsWalletsComponent implements OnInit {
  displayedColumns: string[] = ['users', 'balance', 'actions'];
  vendors: any[] = [];
  isLoading = false;
  
  // Pagination properties
  totalItems = 0;
  pageSize = 10;
  currentPage = 1;
  allVendors: any[] = []; // Store original data
  filteredVendors: any[] = [];
  searchQuery: string = '';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadVendors();
  }

 loadVendors() {
  this.isLoading = true;
  this.userService.getVendors(this.currentPage, this.pageSize).subscribe({
    next: (res) => {
      // Correctly mapping based on your UserWalletListResponse interface
      this.vendors = res.data.wallets.data; 
      
      // CRITICAL: Update the dataSource used in HTML
      this.filteredVendors = [...this.vendors]; 
      
      this.totalItems = res.data.wallets.total;
      this.isLoading = false;
    },
    error: (err) => {
      this.isLoading = false;
      console.error(err);
    }
  });
}
 applyFilter() {
  if (!this.searchQuery) {
    this.filteredVendors = [...this.vendors];
    return;
  }
  
  const query = this.searchQuery.toLowerCase().trim();
  this.filteredVendors = this.vendors.filter(vendor => 
    vendor.walletable?.name?.toLowerCase().includes(query) ||
    vendor.unique_key?.toLowerCase().includes(query)
  );
}
    
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadVendors();
  }

  onSettleMoney(vendor: any) {
    console.log('Settling money for:', vendor.walletable?.name);
  }
 
}