// Interceptor that adds the authorization header to all requests
// if the user is logged in.
// If a 401 is received, it will try to refresh the token.
// If the refresh token is expired, it will log the user out.
// If the refresh token is valid, it will retry the request.

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppAuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly injector: Injector) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // If the request is to the auth endpoint, skip the interceptor
    if (request.url.includes('auth')) {
      return next.handle(request);
    }

    const authService = this.injector.get(AppAuthService);

    // Check the isAUthenticated$ observable to see if the user is logged in.
    // If they are, add the authorization header to the request.
    if (authService.isAuthenticated) {
      const token = authService.accessToken;
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }

    return next.handle(request).pipe(
      tap({
        error: (err) => {
          if (err.status === 401) {
            authService.doTokenRefresh().subscribe({
              error: (err) => {
                if (err.status === 401) {
                  authService.logout();
                }
              },
            });
          }
        },
      })
    );
  }
}
