import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

import EateryResponseModel from "../../shared/models/responses/eatery-response.model";

@Injectable({
  providedIn: 'root'
})
export class EateryService {
  private readonly http = inject(HttpClient);

  private readonly eateryApi = `${environment.apiUrl}/eateries`;
  private readonly headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });

  getEateryById(id: number): Observable<EateryResponseModel> {
    return this.http.get<EateryResponseModel>(`${this.eateryApi}/${id}`, {headers: this.headers});
  }

  getEateriesByUserId(): Observable<EateryResponseModel[]> {
    return this.http.get<EateryResponseModel[]>(`${this.eateryApi}/user`, {headers: this.headers});
  }

  getEateriesByParam(searchParam: string | null): Observable<EateryResponseModel[]> {
    const params: HttpParams = new HttpParams().set("searchParam", searchParam ?? "");

    return this.http.get<EateryResponseModel[]>(`${this.eateryApi}/filtered`, {headers: this.headers, params: params});
  }
}
