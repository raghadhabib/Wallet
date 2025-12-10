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

  private loginUrl = `${environment.apiUrl}/login`;

  

  constructor(private http: HttpClient) {}

  // تعديل الدالة لتقوم بحفظ التوكن ونوع المستخدم
 login(credentials: LoginRequest) {
    // 🛑 2. تعريف الـ payload هنا قبل استخدامه
    const payload = {
      email: credentials.email,
      password: credentials.password
      // 💡 أضف هنا أي حقول ثابتة أو إضافية مثل: login_source: 'web_app' 
    };
    
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
    ); // ⬅️ التأكد من إغلاق القوسين هنا
  };
   getToken(): string | null {  
        return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }
  isLoggedIn(): boolean {
    // !!this.getToken() تحول القيمة إلى true إذا وُجد التوكن وإلى false إذا كان null
    return !!this.getToken();
  }

  // 🛑 2. الدالة المفقودة: logout (يطلبها sidebar.ts)
  logout(): void {
    // يفضل مسح المفاتيح المحددة بدلاً من مسح كل شيء لتجنب مسح بيانات تطبيقات أخرى
    localStorage.removeItem(this.AUTH_TOKEN_KEY); 
    localStorage.removeItem(this.USER_TYPE_KEY); 
    // يمكنك أيضاً استخدام localStorage.clear(); إذا كنت متأكداً من عدم وجود بيانات أخرى مهمة.
  }
  } 

