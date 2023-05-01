import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";

import { AuthenticationService } from "../authentication/authentication.service";

export const canActivateAny: CanActivateFn = () => {
  const authenticationService = inject(AuthenticationService);

  if (authenticationService.hasValidToken()) {
    return true;
  }

  authenticationService.logoutUnauthorized();

  return false;
}
