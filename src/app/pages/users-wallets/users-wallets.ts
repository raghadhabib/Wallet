import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // لأجل حقل البحث
import { UserService } from '../../core/services/user.service'; // ⬅️ استيراد الخدمة
import { UserWallet } from '../../core/services/user.service';

@Component({
  selector: 'app-users-wallets',
  standalone: true,
  imports: [CommonModule, FormsModule], // إضافة FormsModule
  templateUrl: './users-wallets.html',
  styleUrls: ['./users-wallets.css']
})
export class UsersWalletsComponent implements OnInit {
  
  searchTerm: string = '';
  // بيانات وهمية للاختبار حتى يتم ربطها بالـ API
  users: UserWallet[] = [];
  isLoading: boolean = false;
  
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // هنا سنبدأ باستدعاء خدمة جلب البيانات لاحقاً
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.userService.getUsers(1, 10).subscribe({
      next: (response) => {
        // الـ API يرجع البيانات في حقل 'data' (UserWalletListResponse)
        this.users = response.data; 
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
  onSearch() {
    console.log('Searching for:', this.searchTerm);
    // منطق فلترة البيانات هنا...
  }
}