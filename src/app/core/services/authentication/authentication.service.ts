import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { environment } from "../../../../environments/environment";

import { AlertService } from "../alert/alert.service";
import LoginRequestModel from "../../../shared/models/requests/login-request.model";
import LoginResponseModel from "../../../shared/models/responses/login-response.model";
import { BehaviorSubject, Observable } from "rxjs";
import UserInfoModel from "../../../shared/models/entities/user-info.model";
import DecodedTokenModel from "../../../shared/models/entities/decoded-token.model";
import { AlertTypes } from "../../utils/alert-types";
import RegisterRequestModel from "../../../shared/models/requests/register-request.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly alertService = inject(AlertService);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly authApi = `${environment.apiUrl}/authentication`;
  private readonly httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  private readonly tokenKey = "BeadToken";
  private readonly userInfoSubject = new BehaviorSubject<UserInfoModel>(this.getUserLoggedIn());

  getUserInfo(): Observable<UserInfoModel | undefined> {
    return this.userInfoSubject.asObservable();
  }

  login(request: LoginRequestModel): any {
    this.http.post<LoginResponseModel>(`${this.authApi}/login`, request, this.httpOptions).subscribe({
      next: (response: LoginResponseModel) => {
        this.saveToken(response.token);

        this.alertService.handleMessage(AlertTypes.Success, "You have successfully logged in!");

        const role: string = this.userInfoSubject.getValue().role.toLowerCase();
        console.log(role);
        this.router.navigate([`${role}-dashboard`]);
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.handleErrorResponse(error);
      }
    });
  }

  register(request: RegisterRequestModel): any {
    this.http.post(`${this.authApi}/register`, request, this.httpOptions).subscribe({
      next: () => {
        this.alertService.handleMessage(AlertTypes.Success, "You have successfully registered your account!");

        this.router.navigate(['login']);
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.handleErrorResponse(error);
      }
    });
  }

  logout(): void {
    localStorage.clear();

    this.userInfoSubject.next({} as UserInfoModel);

    this.router.navigate(['/login']);
  }

  logoutUnauthorized(): void {
    this.alertService.handleMessage(AlertTypes.Error, "You are not allowed to view that page!");

    this.logout();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  hasValidToken(): boolean {
    const userInfo: UserInfoModel = this.userInfoSubject.getValue();

    if (!userInfo.exp) {
      //this.alertService.handleMessage(AlertTypes.Error, "Your are not authorized to view this resource!");
      this.logout();

      return false;
    }

    if ((Math.floor((new Date).getTime() / 1000)) >= userInfo.exp) {
      this.alertService.handleMessage(AlertTypes.Warning, "Your token has expired. Please login again!");
      this.logout();

      return false;
    }

    return true;
  }

  getUserLoggedIn(): UserInfoModel {
    const token = localStorage.getItem(this.tokenKey);

    if (token && token.length > 0) {
      const decodedToken = this.decodeToken(token);

      if (decodedToken) {
        return ({
          exp: decodedToken.exp,
          role: decodedToken.role.toLowerCase(),
          sub: decodedToken.sub
        })
      }

      localStorage.clear();

      return {} as UserInfoModel;
    }

    return {} as UserInfoModel;
  }

  private decodeToken(token: string): DecodedTokenModel | undefined {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
      const parsed: DecodedTokenModel = (JSON.parse(decodeURIComponent(window.atob(base64))));

      return parsed;
    } catch {
      this.alertService.handleMessage(AlertTypes.Error, "Invalid token!");

      return;
    }
  }

  private saveToken(token: string): void {
    localStorage.clear();
    localStorage.setItem(this.tokenKey, token);

    this.userInfoSubject.next(this.getUserLoggedIn());
  }
}
