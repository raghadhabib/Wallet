import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-toast',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="toast-wrapper">
      <div class="status-bar"></div>
      <div class="toast-content">
        <div class="header-row">
          <mat-icon class="success-icon">check</mat-icon>
          <span class="title">success</span>
          <mat-icon class="close-icon" (click)="snackBarRef.dismiss()">close</mat-icon>
        </div>
        <p class="message">Transfer completed successfully</p>
      </div>
    </div>
  `,
  styles: [`
   .toast-wrapper {
  display: flex;
  background: #f0fdf4; 
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  max-width: 350px;
  /* Add this for better visibility in the bottom corner */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px; /* Optional spacing from edge */
  margin-right: 20px;
}
    .status-bar {
      width: 6px;
      background-color: #22c55e; /* Vibrant green bar */
    }
    .toast-content {
      flex: 1;
      padding: 16px;
    }
    .header-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .success-icon {
      color: #22c55e;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
    .title {
      color: #15803d;
      font-weight: 600;
      font-size: 16px;
      text-transform: lowercase;
      flex: 1;
    }
    .close-icon {
      color: #15803d;
      font-size: 18px;
      cursor: pointer;
    }
    .message {
      margin: 0;
      color: #374151;
      font-size: 14px;
      padding-left: 28px; /* Align with the text under the icon */
    }
  `]
})
export class SuccessToastComponent {
  constructor(public snackBarRef: MatSnackBarRef<SuccessToastComponent>) {}
}