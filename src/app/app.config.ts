import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient , withInterceptors } from '@angular/common/http';

import { authInterceptor } from './core/interceptor/auth.interceptor-interceptor';
import { routes } from './app.routes';
import { MatSnackBarModule } from '@angular/material/snack-bar';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    MatSnackBarModule
  
  ]
};
