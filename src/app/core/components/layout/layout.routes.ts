import { Route } from "@angular/router";
import { canActivate } from "../../services/authentication/can-activate.service";

export const routes: Route[] = [
  {
    path: "not-found",
    loadComponent: () =>
      import("../../../pages/not-found/not-found.component").then((m) => m.NotFoundComponent),
    canActivate: [canActivate]
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import("../../../pages/dashboard/dashboard.component").then((m) => m.DashboardComponent)
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/dashboard"
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "/not-found"
  },
];
