import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";

import { MatIconModule } from "@angular/material/icon";

import { AuthenticationService } from "../../services/authentication/authentication.service";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, MatIconModule, RouterLink, MatMenuModule, NgOptimizedImage, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly authenticationService = inject(AuthenticationService);

  userInfo$ = this.authenticationService.getUserInfo();

  logout(): void {
    this.authenticationService.logout();
  }
}
