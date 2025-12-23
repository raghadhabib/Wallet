import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { UserService } from '../../core/services/user.service'; 
import { UserWallet } from '../../core/services/user.service';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { WalletActionsModalComponent } from './wallet-actions-modal/wallet-actions-modal';
import { TransactionService } from '../../core/services/transaction'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-wallets',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatTableModule, 
    MatProgressSpinnerModule, 
    MatPaginatorModule,
    MatDialogModule, 
    RouterModule
  ], 
  templateUrl: './users-wallets.html',
  styleUrls: ['./users-wallets.css']
})
export class UsersWalletsComponent implements OnInit {
  
  searchTerm: string = '';
  users: UserWallet[] = [];
  isLoading: boolean = false;
  
  private originalUsers: UserWallet[] = [];

  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25];

  displayedColumns: string[] = ['user', 'balance', 'actions'];

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private transactionService: TransactionService ,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

 
  openWalletActions(wallet: UserWallet): void {
    const dialogRef = this.dialog.open(WalletActionsModalComponent, {
      width: '500px',
      data: { wallet: wallet },
      panelClass: 'custom-modal-container' 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.executeWalletAction(result);
      }
    });
  }


  executeWalletAction(formData: any): void {
    this.isLoading = true;

    const payload = {
    from_wallet_id: formData.from,
    to_wallet_id: formData.to,
    amount: formData.amount,
    reason: formData.reason
  }
    

    console.log('Sending to API:', formData);
    
     this.transactionService.executeCredit(payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.fetchUsers(); 
        console.log('Transaction Successful');
      },
      error: (err) => {
        this.isLoading = false;
        this.showErrorToast(err.error?.message || 'One or both wallets are inactive or deleted');
       
      }
    });
    
    setTimeout(() => { this.fetchUsers(); }, 1000);
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        const receivedData = response.data.wallets;
        const receivedUsers = receivedData.data;

        this.totalItems = receivedData.total || 0; 
        this.originalUsers = receivedUsers;
        this.users = receivedUsers;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch users:', err);
        this.isLoading = false;
      }
    });
  }

  handlePageEvent(e: PageEvent): void {
    this.currentPage = e.pageIndex + 1; 
    this.pageSize = e.pageSize;
    this.fetchUsers();
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    if (!term) {
      this.users = this.originalUsers;
      return;
    }
    this.users = this.originalUsers.filter(user => {
      return (
        user.walletable.name.toLowerCase().includes(term) ||
        user.unique_key.toLowerCase().includes(term)
      );
    });
  }

  private showErrorToast(message: string): void {
  this.snackBar.open(message, '×', {
    duration: 5000,
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
    panelClass: ['error-snackbar'] 
  });
}


viewProfile(wallet: any) {
  this.router.navigate(['/app/users/profile', wallet.id]);
}
}