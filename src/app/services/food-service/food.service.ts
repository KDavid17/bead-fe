import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

import FoodResponseModel from "../../shared/models/responses/food-response.model";
import FoodDetailsResponseModel from "../../shared/models/responses/food-details-response.model";

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private readonly http = inject(HttpClient);

  private readonly foodsApi = `${environment.apiUrl}/foods`;
  private readonly headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });

  getFoodDetailsById(id: number): Observable<FoodDetailsResponseModel[]> {
    return this.http.get<FoodDetailsResponseModel[]>(`${this.foodsApi}/${id}/details`, {headers: this.headers});
  }

  getFoodsDetailsByEateryId(id: number): Observable<FoodDetailsResponseModel[]> {
    return this.http.get<FoodDetailsResponseModel[]>(`${this.foodsApi}/details/eatery/${id}`, {headers: this.headers});
  }
}
