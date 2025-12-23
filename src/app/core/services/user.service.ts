import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface VendorWallet {
  id: string;
  balance: number;
  unique_key: string;
  walletable: {
    name: string;
  };
}

export interface Walletable {
    id: number;
    name: string; 
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface UserWallet {
id: string;
balance: number;
walletable: Walletable; 
walletable_type: string; 
unique_key: string; 
}

export interface WalletsResponse {
  current_page: number;
  data: UserWallet[];
  total: number;
}


export interface UserWalletListResponse {
  data: {
    wallets: WalletsResponse; 
  };
  current_datetime: string;
}
export interface WalletBalanceResponse {
  data: {
    wallet_id: number;
    balance: number;
    is_active: boolean;
    walletable_type: string;
    unique_key: string;
    wallet_name: string;
  };
  current_datetime: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/wallets`; 

  constructor(private http: HttpClient) {}

 
  getUsers(page: number = 1, pageSize: number = 10): Observable<UserWalletListResponse> {
    const url = `${this.baseUrl}/getUserWalletsList`;
    const params = {
      page: page.toString(),
      page_size: pageSize.toString()
    };


    return this.http.get<UserWalletListResponse>(url, { params });
  }
  getVendors(page: number = 1, pageSize: number = 10): Observable<UserWalletListResponse> {
  const url = `${environment.apiUrl}/wallets/getVendorWalletsList`; // Verify this endpoint
  const params = { page: page.toString(), page_size: pageSize.toString() };
  return this.http.get<UserWalletListResponse>(url, { params });
}

// Get specific wallet balance/details
getUserBalance(walletId: string): Observable<WalletBalanceResponse> {
  const url = `${environment.apiUrl}/wallets/balance`; 
  return this.http.get<WalletBalanceResponse>(url, { params: { wallet_id: walletId } });
}

// Get transactions for this specific wallet
getUserTransactions(walletId: string, page: number = 0, pageSize: number = 10): Observable<any> {
  const url = `${environment.apiUrl}/transactions/list`;
  const params = {
    page: page.toString(),
    page_size: pageSize.toString(),
    wallet_id: walletId
  };
  return this.http.get<any>(url, { params });
}
}