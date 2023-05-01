import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";

import { MatSnackBar } from "@angular/material/snack-bar";

import { AlertComponent } from "../../components/alert/alert.component";
import { AlertTypes } from "../../utils/alert-types";

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  snackBar = inject(MatSnackBar);

  private openSnackBar(alertType: AlertTypes, message: string) {
    this.snackBar.openFromComponent(AlertComponent, {
      data: {
        type: alertType,
        message: message,
      },
      duration: 5000,
      panelClass: [alertType.toLowerCase()]
    });
  }

  handleMessage(alertType: AlertTypes, message: string = "") {
    if (message && message.length > 0) {
      this.openSnackBar(alertType, message);
    } else {
      this.openSnackBar(alertType, "Operation could not be completed due to an error!")
    }
  }

  handleErrorResponse(error: HttpErrorResponse): void {
    if (error.error.errors) {
      const errors = error.error.errors;
      let message = "";

      Object.keys(errors).forEach((key: string): void => {
        errors[key].forEach((err: string): void => {
          message += err + '\n';
        })
      })

      this.openSnackBar(AlertTypes.Error, message);
    } else if (error.error.title) {
      this.openSnackBar(AlertTypes.Error, error.error.title);
    } else {
      this.openSnackBar(AlertTypes.Error, "An unexpected error occurred. Please contact the Administrator!");
    }
  }
}
