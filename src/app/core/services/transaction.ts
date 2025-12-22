import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


export interface Transaction {
  id: number;
  type: string; 
  amount: number;
  created_at: string; 
  action_datetime: string;
  sender_wallet?: {
    name: string;
    walletable?: { name: string };
  };
  recipient_wallet?: {
    name: string;
    walletable?: { name: string };
  };
  from_wallet_id: number;
  to_wallet_id: number;
  from_name: string;
  to_name: string;
}


export interface TransactionsResponse {
  current_page: number;
  data: Transaction[];
  total: number;
}

export interface TransactionListResponse {
  data: {
    transactions: TransactionsResponse; 
  };
  current_datetime: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = `${environment.apiUrl}`; 

  constructor(private http: HttpClient) {}


  private getTypeMapping(uiType: string): string {
    switch (uiType) {
      case 'Normal':
        return 'transfer'; 
      case 'Charges':
        return 'fund'; 
      case 'Settlements':
        return 'settlement'; 
      default:
        return 'transfer';
    }
  }

 

  //  * @param page - رقم الصفحة
  //  * @param pageSize - حجم الصفحة
  //  * @param uiType - نوع المعاملة كما يظهر في الـ UI (Normal, Charges, Settlements)
  //  */
getTransactions(page: number = 1, pageSize: number = 10, uiType: string = 'Normal'): Observable<TransactionListResponse> {
    const userType = localStorage.getItem('user_type');
    const walletId = localStorage.getItem('wallet_id');
    
    // 1. Determine the correct URL based on user type
    // Merchants use 'getMerchantTransactionsList', Vendors use 'list'
    const endpoint = (userType === 'vendors') ? 'list' : 'getMerchantTransactionsList';
    const url = `${this.baseUrl}/transactions/${endpoint}`;

    // 2. Setup base parameters
    const params: Record<string, string> = {
      page: page.toString(),
      page_size: pageSize.toString(),
      type: this.getTypeMapping(uiType)
    };

    // 3. Only attach wallet_id if the user is a vendor
    if (userType === 'vendors' && walletId) {
      params['wallet_id'] = walletId;
    }

    return this.http.get<TransactionListResponse>(url, { params });
}

// Inside TransactionService class
executeCredit(data: any): Observable<any> {
  const url = `${this.baseUrl}/transactions/execute`; // Replace with your actual endpoint
  return this.http.post(url, {
    to_wallet_id: data.to,
    amount: data.amount,
    reason: data.reason,
    type: 'credit' // or 'transfer' depending on logic
  });
}

}
