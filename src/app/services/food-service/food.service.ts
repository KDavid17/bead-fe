import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

import FoodDetailsResponseModel from "../../shared/models/responses/food-details-response.model";
import { AlertTypes } from "../../core/utils/alert-types";
import { AlertService } from "../../core/services/alert/alert.service";
import FoodRequestModel from "../../shared/models/requests/food-request.model";

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private readonly http = inject(HttpClient);
  private readonly alertService = inject(AlertService);

  private readonly foodsApi = `${environment.apiUrl}/foods`;
  private readonly headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });

  getFoodsDetailsByEateryId(id: number): Observable<FoodDetailsResponseModel[]> {
    return this.http.get<FoodDetailsResponseModel[]>(`${this.foodsApi}/details/eatery/${id}`, {headers: this.headers});
  }

  addFood(request: FoodRequestModel): void {
    this.http.post(`${this.foodsApi}`, request, {headers: this.headers}).subscribe({
      next: () => {
        this.alertService.handleMessage(AlertTypes.Success, "Food added successfully!");
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.handleErrorResponse(error);
      }
    });
  }

  editFood(foodId: number, request: FoodRequestModel): void {
    this.http.put(`${this.foodsApi}/${foodId}`, request, {headers: this.headers}).subscribe({
      next: () => {
        this.alertService.handleMessage(AlertTypes.Success, "Food added successfully!");
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.handleErrorResponse(error);
      }
    });
  }

  deleteFood(foodId: number): void {
    this.http.delete(`${this.foodsApi}/${foodId}`, {headers: this.headers}).subscribe({
      next: () => {
        this.alertService.handleMessage(AlertTypes.Success, "Food deleted successfully!");
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.handleErrorResponse(error);
      }
    });
  }
}
