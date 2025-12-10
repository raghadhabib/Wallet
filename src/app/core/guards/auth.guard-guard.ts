import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * وظيفة الـ Guard للتحقق من حالة تسجيل الدخول.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // مسموح بالدخول
  } else {
    // إعادة التوجيه إلى صفحة الدخول
    return router.createUrlTree(['/login']); 
  }
};