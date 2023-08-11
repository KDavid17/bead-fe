import { Route } from "@angular/router";

import { canActivateAdmin } from "../../services/can-activate/can-activate-admin.service";
import { canActivateAny } from "../../services/can-activate/can-activate-any.service";
import { canActivateEatery } from "../../services/can-activate/can-activate-eatery.service";
import { canActivateUser } from "../../services/can-activate/can-activate-user.service";

export const routes: Route[] = [
  {
    path: "not-found",
    loadComponent: () =>
      import("../../../pages/bead/not-found/not-found.component").then((m) => m.NotFoundComponent),
    canActivate: [canActivateAny]
  },
  {
    path: "terms-and-conditions",
    loadComponent: () =>
      import("../../../pages/bead/terms-and-conditions/terms-and-conditions.component").then((m) => m.TermsAndConditionsComponent),
    canActivate: [canActivateAny],
  },
  {
    path: "about",
    loadComponent: () =>
      import("../../../pages/bead/about/about.component").then((m) => m.AboutComponent),
    canActivate: [canActivateAny],
  },
  {
    path: "eateries",
    loadComponent: () =>
      import("../../../pages/bead/eateries/eateries.component").then((m) => m.EateriesComponent),
    canActivate: [canActivateUser],
  },
  {
    path: "eateries/:eateryId",
    loadComponent: () =>
      import("../../../pages/bead/eatery/eatery.component").then((m) => m.EateryComponent),
    canActivate: [canActivateUser]
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import("../../../pages/bead/dashboard/dashboard.component").then((m) => m.DashboardComponent),
    canActivate: [canActivateUser],
  },
  {
    path: "profile",
    loadComponent: () =>
      import("../../../pages/bead/profile/profile.component").then((m) => m.ProfileComponent),
    canActivate: [canActivateUser],
  },
  {
    path: "eatery-dashboard",
    loadComponent: () =>
      import("../../../pages/eatery/eatery-dashboard/eatery-dashboard.component").then((m) => m.EateryDashboardComponent),
    canActivate: [canActivateEatery],
  },
  {
    path: "admin-dashboard",
    loadComponent: () =>
      import("../../../pages/admin/admin-dashboard/admin-dashboard.component").then((m) => m.AdminDashboardComponent),
    canActivate: [canActivateAdmin],
  },
  {
    path: "book",
    loadComponent: () =>
      import("../../../pages/bead/book/book.component").then((m) => m.BookComponent),
    canActivate: [canActivateUser],
  },
  {
    path: "user-dashboard",
    pathMatch: "full",
    redirectTo: "/dashboard"
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: `/login`
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "/not-found"
  },
];
