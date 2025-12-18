import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { LoginRequest } from '../models/login-request.model';
import { tap } from 'rxjs'; 


interface AuthUser {
  id: number;
  authable_type: string;
} 


export interface LoginResponse {
  data: {
    token: string; 
    refresh_token: string;
    expires_in: number;
    auth_users: AuthUser; 
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


 login(credentials: LoginRequest) {
    const payload = {
      email: credentials.email,
      password: credentials.password,
      login_source: 'web_app'
    };

  
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
  };
   getToken(): string | null {  
        return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  
  logout(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY); 
    localStorage.removeItem(this.USER_TYPE_KEY);
  }
  } 

