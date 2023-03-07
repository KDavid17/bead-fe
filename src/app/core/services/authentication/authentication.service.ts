import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError } from "rxjs";

import { environment } from "../../../../environments/environment";

import { ILoginRequest } from "../../models/requests/ILoginRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly authApi = `${environment.apiUrl}/authentication`;
  private readonly httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  private readonly tokenKey = "Token";

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  login(request: ILoginRequest): any {
    this.http.post(`${this.authApi}/login`, request, this.httpOptions)
  }
  //
  // register(user: UserRegisterModel): Observable<UserRegisterResponseModel> {
  //   return this.http.post<UserRegisterResponseModel>(
  //     `${this.authApi}/register`,
  //     user,
  //     this.httpOptions,
  //   );
  // }

  clearStorage(): void {
    localStorage.clear();
  }

  saveToken(token: string): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem(this.tokenKey);

    return user && user.length > 0 ? true : false;
  }

  logout(): void {
    localStorage.clear();

    this.router.navigate(['/dashboard']);
  }
}
