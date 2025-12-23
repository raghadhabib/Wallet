import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isPasswordVisible: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  
onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          // Success Snack-bar
          this.snackBar.open('Login Successful!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'], 
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
          });
          this.router.navigate(['/app/users']);
        },
        error: (err) => {
          // Error Snack-bar
          this.snackBar.open('These credentials do not match our records.', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar'], 
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
            
          });
        }
      });
    }
  }
}