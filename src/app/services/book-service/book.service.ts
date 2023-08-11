import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";

import BookingDetailsResponseModel from "../../shared/models/responses/booking-details-response.model";
import BookingRequestModel from "../../shared/models/requests/booking-request.model";
import { AlertService } from "../../core/services/alert/alert.service";
import { AlertTypes } from "../../core/utils/alert-types";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly alertService = inject(AlertService);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly bookingApi = `${environment.apiUrl}/bookings`;
  private readonly headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });

  getBookingsByUserId(): Observable<BookingDetailsResponseModel[]> {
    return this.http.get<BookingDetailsResponseModel[]>(`${this.bookingApi}/user`, {headers: this.headers});
  }

  postBooking(request: BookingRequestModel): void {
    console.log(request);
    this.http.post(`${this.bookingApi}`, request, {headers: this.headers}).subscribe({
      next: () => {
        this.alertService.handleMessage(AlertTypes.Success, "Booking created successfully!");

        this.router.navigate(['dashboard']);
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.handleErrorResponse(error);
      }
    })
  }
}
