import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * وظيفة اعتراض الطلبات لإضافة الـ Token إلى Header.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // لا حاجة لإضافة التوكن لطلب تسجيل الدخول نفسه
 if (req.url.includes('/login')) {
    return next(req);
  }

  // إذا وجد التوكن، قم بنسخ (Clone) الطلب وإضافة الـ Header
if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` 
      }
    });
  }
  return next(req);
};