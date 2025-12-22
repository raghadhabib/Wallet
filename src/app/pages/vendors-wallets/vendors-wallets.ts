import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SettleModalComponent } from './settle-modal/settle-modal';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SuccessToastComponent } from '../../shared/success-toast/success-toast'; // Ensure this path is correct

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
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    SettleModalComponent,
    SuccessToastComponent
  ],
  templateUrl: './vendors-wallets.html',
  styleUrls: ['./vendors-wallets.css']
})
export class VendorsWalletsComponent implements OnInit {
  walletData: any = null;
  errorMessage: string = '';
  displayedColumns: string[] = ['users', 'balance', 'actions'];
  vendors: any[] = [];
  isLoading = false;
  isVendor: boolean = false;
  
  // Pagination properties
  totalItems = 0;
  pageSize = 10;
  currentPage = 1;
  filteredVendors: any[] = [];
  searchQuery: string = '';

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar // Injected SnackBar service
  ) {}

  ngOnInit(): void {

    console.log('INIT: VendorsWalletsComponent started');
  const userType = localStorage.getItem('user_type');
  const walletId = localStorage.getItem('wallet_id');
  
  console.log('DEBUG: userType found ->', userType);
  console.log('DEBUG: walletId found ->', walletId);

  this.isVendor = userType === 'vendors';
  
  if (this.isVendor) {
    console.log('FLOW: User is vendor, calling loadVendorBalance()');
    this.loadVendorBalance();
  } else {
    console.log('FLOW: User is merchant, calling loadVendors()');
    this.loadVendors();
  }

    
   
  }

  loadVendors() {
    this.isLoading = true;
    this.userService.getVendors(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        // Correctly mapping based on UserWalletListResponse interface
        this.vendors = res.data.wallets.data; 
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

  loadVendorBalance() {
    const walletId = localStorage.getItem('wallet_id');
  if (walletId) {
    this.isLoading = true;
    this.userService.getUserBalance(walletId).subscribe({
      next: (res) => {
        this.walletData = res.data; // This matches your JSON: data.wallet_name, data.balance, etc.
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Balance Error:', err);
        this.isLoading = false;
      }
    });
  }
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

  /**
   * Opens the Settlement Modal and displays a success toast upon completion
   * @param vendor The vendor object from the table row
   */
  onSettleMoney(vendor: any) {
    const dialogRef = this.dialog.open(SettleModalComponent, {
      width: '450px',
      maxWidth: '90vw',
      panelClass: 'custom-modal-panel',
      data: { 
        vendorName: vendor.walletable?.name || 'Unknown Vendor',
        vendorId: vendor.id 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Received Settlement Data:', result);
        
        // After successfully processing the settlement, show the toast
        this.showSuccessToast();
      }
    });
  }

  /**
   * Displays the custom success toast exactly like the provided image
   */
  private showSuccessToast() {
  this.snackBar.openFromComponent(SuccessToastComponent, {
    duration: 5000,
    horizontalPosition: 'end',    // Right side
    verticalPosition: 'bottom',   // Change from 'top' to 'bottom'
    panelClass: ['custom-toast-container'] 
  });
}
}