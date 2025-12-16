import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

// 🛑 1. تعريف نموذج بيانات المعاملة الواحدة
export interface Transaction {
  id: number;
  type: string; // مثل 'Normal', 'Charge', 'Settlement'
  amount: number;
  created_at: string; // التاريخ والوقت

  // ⬅️ إضافة حقول أسماء المرسل والمستقبل لتطابق الصورة
  from_wallet_id: number;
  to_wallet_id: number;
  from_name: string; // اسم المرسل (مثال: maha)
  to_name: string; // اسم المستقبل (مثال: AbdOHS)
}

// 🛑 2. تعريف هيكل الرد من API لقائمة المعاملات (Wallets)
export interface TransactionsResponse {
  current_page: number;
  data: Transaction[];
  total: number;
}

// 🛑 3. تعريف الهيكل الرئيسي لرد جلب المعاملات
export interface TransactionListResponse {
  data: {
    transactions: TransactionsResponse; // حقل 'transactions' يحتوي على قائمة المعاملات
  };
  current_datetime: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  // استخدام الـ API URL من environment
  private baseUrl = `${environment.apiUrl}`; 

  constructor(private http: HttpClient) {}

  /**
   * دالة مساعدة لربط أسماء التبويبات في الـ UI مع أنواع المعاملات في الـ API.
   * (تم ربط 'Normal' بـ 'transfer' بناءً على طلبك)
   */
  private getTypeMapping(uiType: string): string {
    switch (uiType) {
      case 'Normal':
        return 'transfer'; // ⬅️ المسار الصحيح للحركات العادية
      case 'Charges':
        return 'fund'; // افتراضي: يجب التأكد من اسم الـ API الفعلي
      case 'Settlements':
        return 'settlement'; // افتراضي: يجب التأكد من اسم الـ API الفعلي
      default:
        return 'transfer';
    }
  }

  /**
   * جلب قائمة المعاملات من API بناءً على النوع.
   * المسار المستخدم: /api/transactions/getMerchantTransactionsList
   * @param page - رقم الصفحة
   * @param pageSize - حجم الصفحة
   * @param uiType - نوع المعاملة كما يظهر في الـ UI (Normal, Charges, Settlements)
   */
  getTransactions(page: number = 1, pageSize: number = 10, uiType: string = 'Normal'): Observable<TransactionListResponse> {
    
    // 🛑 تحديث مسار API لنقطة النهاية الصحيحة
    const url = `${this.baseUrl}/transactions/getMerchantTransactionsList`; 
    
    // 🛑 استخدام القيمة المترجمة لنوع المعاملة
    const apiType = this.getTypeMapping(uiType);

    const params = {
      page: page.toString(),
      page_size: pageSize.toString(),
      type: apiType // إرسال النوع المترجم (مثلاً: 'transfer')
    };

    // الـ HttpInterceptor سيضيف التوكن تلقائياً هنا
    return this.http.get<TransactionListResponse>(url, { params });
  }
}
