import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { LoginRequest } from '../models/login-request.model';
import { tap } from 'rxjs'; // ⬅️ إضافة الاستيراد


interface AuthUser {
  id: number;
  authable_type: string; // هذا هو حقل نوع المستخدم
  // ... باقي الحقول اختيارية
} 

// تعريف نموذج مبسط لرد الـ API
export interface LoginResponse {
  data: {
    token: string; // ⬅️ التوكن موجود هنا
    refresh_token: string;
    expires_in: number;
    auth_users: AuthUser; // ⬅️ نوع المستخدم موجود هنا
    wallet_id: number | null;
  };
  current_datetime: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private AUTH_TOKEN_KEY = 'auth_token'; 
  private USER_TYPE_KEY = 'user_type';

  private apiUrl = `${environment.apiUrl}/login`;

  constructor(private http: HttpClient) {}

  // تعديل الدالة لتقوم بحفظ التوكن ونوع المستخدم
  login(credentials: LoginRequest) {
    // يجب تحديد نوع الرد لتمكين استخدام .pipe و tap
    return this.http.post<LoginResponse>(this.loginUrl, payload).pipe(
      tap((response) => {
          const token = response.data.token;
          const userType = response.data.auth_users.authable_type;

    if (token && userType) {
          localStorage.setItem(this.AUTH_TOKEN_KEY, token); 
          localStorage.setItem(this.USER_TYPE_KEY, userType); 
          console.log('Token and User Type saved successfully.');
        } else {
          console.error('Login successful, but token or user type field is missing in response.');
        }
      })
    );
  }
  
  // دالة لجلب التوكن لإضافته في الـ Header
  getToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  // دالة للتحقق من وجود توكن صالح
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // دالة لمسح التوكن عند تسجيل الخروج (سنستخدمها لاحقاً)
  logout(): void {
    localStorage.clear(); // مسح كل شيء يتعلق بالمستخدم
  }
}