import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";

import { AuthenticationService } from "../authentication/authentication.service";
import { RoleTypes } from "../../utils/role-types";

export const canActivateEatery: CanActivateFn = () => {
  const authenticationService = inject(AuthenticationService);

  if (authenticationService.hasValidToken() && authenticationService.getUserLoggedIn().role === RoleTypes.Eatery) {
    return true;
  }

  authenticationService.logoutUnauthorized();

  return false;
}
