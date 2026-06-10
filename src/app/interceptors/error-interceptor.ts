import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth';
import { NotificationService } from '../services/notification';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const notifications = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = "Une erreur inattendue s'est produite.";

      if (error.status === 0) {
        message = 'Serveur injoignable. Vérifie que l’API est démarrée.';
      } else if (error.status === 401) {
        message = 'Session expirée, reconnecte-toi.';
        auth.logout();
        router.navigate(['/login']);
      } else if (error.status === 403) {
        message = 'Action non autorisée.';
      } else if (error.status === 404) {
        message = 'Ressource introuvable.';
      } else if (error.error?.message) {
        message = error.error.message;
      }

      notifications.error(message);
      return throwError(() => error);
    }),
  );
};
