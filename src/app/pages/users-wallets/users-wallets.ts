import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { UserService } from '../../core/services/user.service'; 
import { UserWallet } from '../../core/services/user.service';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users-wallets',
  standalone: true,
  imports: [CommonModule, FormsModule,MatTableModule, MatProgressSpinnerModule, MatPaginatorModule], 
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

  

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
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
}