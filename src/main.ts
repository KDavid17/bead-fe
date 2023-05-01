import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideRouter, Route } from "@angular/router";
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { authorizationInterceptor } from "./app/core/interceptors/authorization.interceptor";

const appRoutes: Route[] = [
  {
    path: "login",
    loadComponent: () => import("./app/pages/bead/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "register",
    loadComponent: () => import("./app/pages/bead/register/register.component").then((m) => m.RegisterComponent),
  },
  {
    path: "",
    loadComponent: () => import("./app/core/components/layout/layout.component").then((m) => m.LayoutComponent),
    loadChildren: () => import("./app/core/components/layout/layout.routes").then((m) => m.routes),
  },
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(
      withInterceptors([authorizationInterceptor])
    ),
    provideRouter(appRoutes),
    importProvidersFrom([MatSnackBarModule, MatDialogModule]),
  ]
})
  .catch(err => console.error(err));
