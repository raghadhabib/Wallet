import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TransactionService, Transaction } from '../../../core/services/transaction'; 

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    DatePipe],
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.css']
})
export class TransactionsComponent implements OnInit {

  isVendor: boolean = false;
  
  transactions: Transaction[] = [];
  isLoading: boolean = false;
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  
 
  displayedColumns: string[] = ['id', 'date', 'amount'];

  activeTab: 'Normal' | 'Charges' | 'Settlements' = 'Normal';

  constructor(private TransactionService: TransactionService) {}

  ngOnInit(): void {
    this.fetchTransactions();
    const userType = localStorage.getItem('user_type');
    this.isVendor = userType === 'vendors';
    
  }

  fetchTransactions(): void {
    this.isLoading = true;
    const transactionType = this.activeTab; 

    this.TransactionService.getTransactions(this.currentPage, this.pageSize, transactionType).subscribe({
      next: (response) => {
        const receivedData = response.data.transactions;
        this.transactions = response.data.transactions.data; 
        this.totalItems = response.data.transactions.total;
        this.isLoading = false;
        console.log('Transactions Data Received:', this.transactions);
       
      },
      error: (err) => {
        console.error('Failed to fetch transactions:', err);
        this.isLoading = false;
      }
    });
  }


  onTabChange(tab: 'Normal' | 'Charges' | 'Settlements'): void {
    this.activeTab = tab;
    this.currentPage = 1; 
    this.fetchTransactions();
  }

  // Paginator
  handlePageEvent(e: PageEvent): void {
    this.currentPage = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.fetchTransactions();
  }
}
