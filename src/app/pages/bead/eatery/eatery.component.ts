import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from "@angular/router";

import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";

import IngredientResponseModel from "../../../shared/models/responses/ingredient-response.model";

import { EateryService } from "../../../services/eatery-service/eatery.service";
import { FoodService } from "../../../services/food-service/food.service";
import { IngredientService } from "../../../services/ingredient-service/ingredient.service";

@Component({
  selector: 'app-eatery',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatCardModule, MatTooltipModule],
  templateUrl: './eatery.component.html',
  styleUrls: ['./eatery.component.scss']
})
export class EateryComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly eateryService = inject(EateryService);
  private readonly foodsService = inject(FoodService);
  private readonly ingredientService = inject(IngredientService);

  private readonly eateryId = Number(this.activatedRoute.snapshot.paramMap.get('eateryId'));

  eatery$ = this.eateryService.getEateryById(this.eateryId);
  foods$ = this.foodsService.getFoodsDetailsByEateryId(this.eateryId);

  getIngredients(ingredients: IngredientResponseModel[]): string {
    return this.ingredientService.getIngredientsFormatted(ingredients);
  }
}
