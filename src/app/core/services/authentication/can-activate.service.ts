import { inject } from "@angular/core";
import { CanActivateFn, Router} from "@angular/router";

import { AuthenticationService } from "./authentication.service";

export const canActivate: CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.navigate(['/dashboard']).then(() => false);
}
