import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // لأجل حقل البحث
import { UserService } from '../../core/services/user.service'; 
import { UserWallet } from '../../core/services/user.service';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users-wallets',
  standalone: true,
  imports: [CommonModule, FormsModule,MatTableModule, MatProgressSpinnerModule], // إضافة FormsModule
  templateUrl: './users-wallets.html',
  styleUrls: ['./users-wallets.css']
})
export class UsersWalletsComponent implements OnInit {
  
  searchTerm: string = '';
  // بيانات وهمية للاختبار حتى يتم ربطها بالـ API
  users: UserWallet[] = [];
  isLoading: boolean = false;
  
  private originalUsers: UserWallet[] = [];

  displayedColumns: string[] = ['user', 'balance', 'actions'];
  
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // هنا سنبدأ باستدعاء خدمة جلب البيانات لاحقاً
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.userService.getUsers(1, 10).subscribe({
      next: (response) => {
        // 🛑 هذا هو المكان الذي تم فيه التعديل
        // يتم استخلاص البيانات من response.data.wallets.data
        const receivedUsers = response.data.wallets.data; // ⬅️ **هنا يجب وضعه**
        this.originalUsers = receivedUsers;
        this.users = receivedUsers;
        
        // يمكنك إبقاء الـ Log للتأكد:
        console.log('Users Data Received:', this.users);

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch users:', err);
        this.isLoading = false;
        // ⬅️ ملاحظة: إذا كان الـ API يرجع بيانات فارغة كـ 404 بدلاً من 200، فقد نحتاج لإضافة معالجة هنا.
      }
    });
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