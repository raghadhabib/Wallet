// src/app/pages/users-wallets/user-profile/user-profile.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfileComponent implements OnInit {
  userId: string | null = null;
  userName: string = 'maha'; // This would normally come from an API call using the ID
  balance: number = 0;
  transactions: any[] = []; // Empty array to trigger the "No transactions yet" view

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // This gets the :id from the URL
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('Viewing profile for user ID:', this.userId);
  }
}