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

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/wallets`; 

  constructor(private http: HttpClient) {}

  /**
   * @param page - رقم الصفحة
   * @param pageSize - حجم الصفحة
   */
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
  
}