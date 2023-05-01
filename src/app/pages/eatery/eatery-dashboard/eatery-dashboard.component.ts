import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatestWith, map } from "rxjs";

import { EateryProfileComponent } from "./components/eatery-profile/eatery-profile.component";
import { EateryMenuComponent } from "./components/eatery-menu/eatery-menu.component";
import { EateryLayoutComponent } from "./components/eatery-layout/eatery-layout.component";
import { EateryService } from "../../../services/eatery-service/eatery.service";
import { UserService } from "../../../services/user-service/user.service";

@Component({
  selector: 'app-eatery-dashboard',
  standalone: true,
  imports: [CommonModule, EateryProfileComponent, EateryMenuComponent, EateryLayoutComponent],
  templateUrl: './eatery-dashboard.component.html',
  styleUrls: ['./eatery-dashboard.component.scss']
})
export class EateryDashboardComponent {
  private readonly eateryService = inject(EateryService);
  private readonly userService = inject(UserService);

  eateries$ = this.eateryService.getEateriesByUserId();
  userProfile$ = this.userService.getUserProfile();
}
