import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common'; // إضافة DatePipe و CurrencyPipe
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TransactionService, Transaction } from '../../../core/services/transaction'; // سيتم إنشاء الخدمة قريباً

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    DatePipe, // استخدامه في الـ HTML لتنسيق التاريخ
    CurrencyPipe // استخدامه لتنسيق المبلغ
  ],
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.css']
})
export class TransactionsComponent implements OnInit {
  
  transactions: Transaction[] = [];
  isLoading: boolean = false;
  serverDateTime: string | null = null;
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  
  // الأعمدة التي سيتم عرضها في الجدول.
  // 'id' للمعاملة، 'date' و 'amount'
  displayedColumns: string[] = ['id', 'date', 'amount'];

  // لتحديد التبويب النشط: Normal, Charges, Settlements
  activeTab: 'Normal' | 'Charges' | 'Settlements' = 'Normal';

  constructor(private TransactionService: TransactionService) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }

  // جلب المعاملات من الخدمة
  fetchTransactions(): void {
    this.isLoading = true;
    // تحديد نوع المعاملات المطلوب جلبها بناءً على التبويب النشط
    const transactionType = this.activeTab; 

    this.TransactionService.getTransactions(this.currentPage, this.pageSize, transactionType).subscribe({
      next: (response) => {
        const receivedData = response.data.transactions;
        this.transactions = receivedData.data;
        this.totalItems = receivedData.total || 0;
        this.serverDateTime = response.current_datetime;
        this.isLoading = false;
        console.log('Transactions Data Received:', this.transactions);
      },
      error: (err) => {
        console.error('Failed to fetch transactions:', err);
        this.isLoading = false;
      }
    });
  }

  // تغيير التبويب واستدعاء جلب البيانات
  onTabChange(tab: 'Normal' | 'Charges' | 'Settlements'): void {
    this.activeTab = tab;
    this.currentPage = 1; // إرجاع إلى الصفحة الأولى عند تغيير التبويب
    this.fetchTransactions();
  }

  // معالجة تغيير الصفحة في Paginator
  handlePageEvent(e: PageEvent): void {
    this.currentPage = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.fetchTransactions();
  }
}
