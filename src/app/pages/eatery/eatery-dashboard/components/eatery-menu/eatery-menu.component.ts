import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from "rxjs";

import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

import { FoodService } from "../../../../../services/food-service/food.service";
import { EateryFoodsComponent } from "../eatery-foods/eatery-foods.component";
import EateryResponseModel from "../../../../../shared/models/responses/eatery-response.model";
import FoodDetailsResponseModel from "../../../../../shared/models/responses/food-details-response.model";

@Component({
  selector: 'app-eatery-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    EateryFoodsComponent,
  ],
  templateUrl: './eatery-menu.component.html',
  styleUrls: ['./eatery-menu.component.scss']
})
export class EateryMenuComponent {
  @Input() eateries: EateryResponseModel[] | null = null;

  private readonly foodService = inject(FoodService);

  foodsDetails$: Observable<FoodDetailsResponseModel[]> | null = null;

  displayEateryName(eatery: EateryResponseModel): string {
    return eatery ? eatery.name : "";
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent): void {
    this.foodsDetails$ = this.foodService.getFoodsDetailsByEateryId(event.option.value);
  }
}
