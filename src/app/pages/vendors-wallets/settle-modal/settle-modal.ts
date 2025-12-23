import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settle-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './settle-modal.html',
  styleUrls: ['./settle-modal.css']
})
export class SettleModalComponent {
  settleForm: FormGroup;
  fileName: string = '';

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SettleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vendorName: string }
  ) {
    this.settleForm = this.fb.group({
      amount: ['', [Validators.required]],
      notes: ['']
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  /**
   * Helper to show the red error snackbar
   */
  private showError(message: string) {
    this.snackBar.open(message, '✕', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar'] 
    });
  }

  onSettle() {
    const amountValue = this.settleForm.get('amount')?.value;

    
    if (amountValue <= 0) {
      this.showError('Settlement amount must be positive');
      return;
    }

    
    if (this.settleForm.valid) {
      this.dialogRef.close(this.settleForm.value);
    } else {
      this.showError('Please fill in all required fields');
    }
  }
}