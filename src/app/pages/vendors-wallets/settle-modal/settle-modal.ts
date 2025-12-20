import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-settle-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './settle-modal.html',
  styleUrls: ['./settle-modal.css']
})
export class SettleModalComponent {
  settleForm: FormGroup;
  fileName: string = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SettleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vendorName: string }
  ) {
    this.settleForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
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

  onSettle() {
    if (this.settleForm.valid) {
      this.dialogRef.close(this.settleForm.value);
    }
  }
}