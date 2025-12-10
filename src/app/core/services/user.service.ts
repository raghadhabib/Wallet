import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

// نموذج مبسط لرد الـ API


export interface Walletable {
    id: number;
    name: string; // ⬅️ هذا هو الاسم الفعلي للمستخدم
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface UserWallet {
  id: string;
  // 🛑 حذف name القديم وإضافة الحقول الجديدة
  // name: string; // لا حاجة لهذا الحقل هنا
  balance: number;
  // إضافة الحقل المتداخل الجديد
  walletable: Walletable; // ⬅️ هذا هو الحقل الجديد
walletable_type: string; // مثل "users"
  unique_key: string; // مثل "STUDENT-6216-..."
}

export interface WalletsResponse {
  current_page: number;
  data: UserWallet[]; // ⬅️ مصفوفة المستخدمين داخل حقل 'data'
  // ... يمكنك إضافة باقي الحقول مثل first_page_url, from, to, etc.
}

// 🛑 تعديل الهيكل الرئيسي لرد جلب المحافظ (Wallets)
export interface UserWalletListResponse {
  data: {
    wallets: WalletsResponse; // ⬅️ الآن حقل 'wallets' هو المطلوب داخل 'data'
  };
  current_datetime: string;
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