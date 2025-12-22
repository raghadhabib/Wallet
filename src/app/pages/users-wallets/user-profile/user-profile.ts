// src/app/pages/users-wallets/user-profile/user-profile.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, UserWallet } from '../../../core/services/user.service';
import

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfileComponent implements OnInit {
  userWallet: UserWallet | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // 1. Get the ID from the URL parameter
    const walletId = this.route.snapshot.paramMap.get('id');

    if (walletId) {
      this.fetchUserDetails(walletId);
    } else {
      this.errorMessage = 'No user ID found in the URL';
      this.isLoading = false;
    }
  }

  fetchUserDetails(id: string): void {
    this.isLoading = true;
    this.userService.getUserById(id).subscribe({
      next: (response) => {
        // Based on your typical API response: { data: { ... } }
        this.userWallet = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
        this.errorMessage = 'Failed to load user profile.';
        this.isLoading = false;
      }
    });
  }
}