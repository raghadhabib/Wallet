import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

// نموذج مبسط لرد الـ API
export interface UserWallet {
  id: string;
  name: string;
  balance: number;
}

export interface UserWalletListResponse {
  data: UserWallet[];
  total: number;
  page: number;
  page_size: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // استخدام الـ API URL من environment
  private baseUrl = `${environment.apiUrl}/wallets`; 

  constructor(private http: HttpClient) {}

  /**
   * جلب قائمة المستخدمين من API.
   * مسار API: /api/wallets/getUserWalletsList?page=1&page_size=10
   * @param page - رقم الصفحة
   * @param pageSize - حجم الصفحة
   */
  getUsers(page: number = 1, pageSize: number = 10): Observable<UserWalletListResponse> {
    const url = `${this.baseUrl}/getUserWalletsList`;
    const params = {
      page: page.toString(),
      page_size: pageSize.toString()
    };

    // الـ HttpInterceptor سيضيف التوكن تلقائياً هنا
    return this.http.get<UserWalletListResponse>(url, { params });
  }
}