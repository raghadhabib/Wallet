// src/app/pages/users-wallets/user-profile/user-profile.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, UserWallet } from '../../../core/services/user.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common'; // Required for | date and | number
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule,MatProgressSpinnerModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfileComponent implements OnInit {
  walletData: any = null;
  transactions: any[] = [];
  userWallet: UserWallet | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  userId: string | null = null;
  
  


  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // 1. Get the ID from the URL parameter
    const walletId = this.route.snapshot.paramMap.get('id');

    if (walletId) {
      this.loadProfileData(walletId);
    } else {
      this.errorMessage = 'No user ID found in the URL';
      this.isLoading = false;
    }
  }

  
loadProfileData(id: string) {
    this.isLoading = true;
    // Call both APIs at once
    forkJoin({
      balance: this.userService.getUserBalance(id),
      history: this.userService.getUserTransactions(id)
    }).subscribe({
      next: (res) => {
        this.walletData = res.balance.data;
        this.transactions = res.history.data.transactions?.data || res.history.data; // Path based on your TransactionListResponse structure
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading profile', err);
        this.isLoading = false;
      }
    });
  }
}