import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // لأجل حقل البحث
import { UserService } from '../../core/services/user.service'; 
import { UserWallet } from '../../core/services/user.service';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users-wallets',
  standalone: true,
  imports: [CommonModule, FormsModule,MatTableModule, MatProgressSpinnerModule, MatPaginatorModule], // إضافة FormsModule
  templateUrl: './users-wallets.html',
  styleUrls: ['./users-wallets.css']
})
export class UsersWalletsComponent implements OnInit {
  
  searchTerm: string = '';
  // بيانات وهمية للاختبار حتى يتم ربطها بالـ API
  users: UserWallet[] = [];
  isLoading: boolean = false;
  
  private originalUsers: UserWallet[] = [];

  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25];

  displayedColumns: string[] = ['user', 'balance', 'actions'];

  

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // هنا سنبدأ باستدعاء خدمة جلب البيانات لاحقاً
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        const receivedData = response.data.wallets;
        const receivedUsers = receivedData.data;

        // 🛑 5. تحديث إجمالي العناصر (Total Items) من الـ API
        this.totalItems = receivedData.total || 0; 
        
        this.originalUsers = receivedUsers;
        this.users = receivedUsers;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch users:', err);
        this.isLoading = false;
      }
    });
  }
  handlePageEvent(e: PageEvent): void {
    this.currentPage = e.pageIndex + 1; // pageIndex يبدأ من 0، والـ API يبدأ من 1
    this.pageSize = e.pageSize;
    this.fetchUsers();
  }

  // دالة البحث (يمكن تطويرها لاحقاً لفلترة البيانات)
  onSearch(): void {
    const term = this.searchTerm.toLowerCase();

    if (!term) {
      // إذا كان حقل البحث فارغاً، أعد عرض القائمة الأصلية كاملة
      this.users = this.originalUsers;
      return;
    }

    // فلترة القائمة الأصلية
    this.users = this.originalUsers.filter(user => {
      // البحث في الاسم (داخل walletable) أو الرقم التعريفي الفريد
      return (
        user.walletable.name.toLowerCase().includes(term) ||
        user.unique_key.toLowerCase().includes(term)
      );
    });
  }
}