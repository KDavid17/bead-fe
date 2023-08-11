import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthenticationService } from "../../../core/services/authentication/authentication.service";
import { MatCardModule } from "@angular/material/card";

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, NgOptimizedImage, MatCardModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    const role = this.authenticationService.getUserLoggedIn().role;

    this.router.navigate([`${role}-dashboard`]);
    console.log(role);
  }
}
