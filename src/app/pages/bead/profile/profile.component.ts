import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

import IngredientResponseModel from "../../../shared/models/responses/ingredient-response.model";

import { BookService } from "../../../services/book-service/book.service";
import { IngredientService } from "../../../services/ingredient-service/ingredient.service";
import { UserService } from "../../../services/user-service/user.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    NgOptimizedImage,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  private readonly bookingService = inject(BookService);
  private readonly ingredientService = inject(IngredientService);
  private readonly userService = inject(UserService);

  userProfile$ = this.userService.getUserProfile();
  bookings$ = this.bookingService.getBookingsByUserId();

  getIngredients(ingredients: IngredientResponseModel[]): string {
    return this.ingredientService.getIngredientsFormatted(ingredients);
  }
}
