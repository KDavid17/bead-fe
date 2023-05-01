import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";

import { AlertService } from "../services/alert/alert.service";
import { AuthenticationService } from "../services/authentication/authentication.service";

export function authorizationInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const alertService = inject(AlertService);
  const authenticationService = inject(AuthenticationService);

  const token = authenticationService.getToken();

  const clonedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(clonedRequest).pipe(
    catchError((response: HttpErrorResponse) => {
      if (response.status === 401) {
        if (authenticationService.hasValidToken()) {
          alertService.handleErrorResponse(response);
        }

        authenticationService.logout();
      }

      return throwError(() => response);
    })
  );
}
