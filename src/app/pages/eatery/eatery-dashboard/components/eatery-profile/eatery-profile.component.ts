import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import UserResponseModel from "../../../../../shared/models/responses/user-response.model";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-eatery-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule],
  templateUrl: './eatery-profile.component.html',
  styleUrls: ['./eatery-profile.component.scss']
})
export class EateryProfileComponent {
  @Input() userProfile: UserResponseModel | null = null;
}
