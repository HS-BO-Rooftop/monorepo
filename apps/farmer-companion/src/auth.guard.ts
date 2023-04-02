// Angular Guard that checks if the user is logged in

import { inject } from "@angular/core";
import { CanActivateChildFn, Router } from "@angular/router";
import { AppAuthService } from "./auth.service";

export const isLoggedInGuard: CanActivateChildFn = () => {
  const router = inject(Router)
  const authService = inject(AppAuthService)
  const isAuthenticated = authService.isAuthenticated;
  // If  the token is not set, the user is not logged in and we should redirect to the login page
  if (!isAuthenticated) {
    return router.parseUrl("/login");
  }
  return true;
}