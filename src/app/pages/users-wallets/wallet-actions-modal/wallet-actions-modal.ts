import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-wallet-actions-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './wallet-actions-modal.html',
  styleUrls: ['./wallet-actions-modal.css']
})
export class WalletActionsModalComponent {
  walletForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<WalletActionsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { wallet: any } 
  ) {
    this.walletForm = this.fb.group({
      from: [{ value: data.wallet.unique_key, disabled: true }],
      to: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      reason: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onExecute(): void {
    if (this.walletForm.valid) {
      console.log('Executing Credit:', this.walletForm.getRawValue());
      this.dialogRef.close(this.walletForm.getRawValue());
    }
  }
}