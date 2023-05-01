import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import UserResponseModel from "../../shared/models/responses/user-response.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly usersApi = `${environment.apiUrl}/users`;
  private readonly headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });

  getUserProfile(): Observable<UserResponseModel> {
    return this.http.get<UserResponseModel>(`${this.usersApi}/profile`, {headers: this.headers});
  }
}
