import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { UserService } from "../../../services/user-service/user.service";
import { MatTableModule } from "@angular/material/table";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    NgOptimizedImage,
    MatTableModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  private readonly userService = inject(UserService);

  userProfile$ = this.userService.getUserProfile();
  users$ = this.userService.getUsers();
}
