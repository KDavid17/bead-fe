import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { MatExpansionModule } from "@angular/material/expansion";

import FoodDetailsResponseModel from "../../../../../shared/models/responses/food-details-response.model";
import { MatButtonModule } from "@angular/material/button";
import { FoodService } from "../../../../../services/food-service/food.service";
import { EditFoodDialogComponent } from "../edit-food-dialog/edit-food-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import EateryResponseModel from "../../../../../shared/models/responses/eatery-response.model";

@Component({
  selector: 'app-eatery-foods',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, NgOptimizedImage, MatButtonModule],
  templateUrl: './eatery-foods.component.html',
  styleUrls: ['./eatery-foods.component.scss']
})
export class EateryFoodsComponent {
  @Output("emitCurrentEatery") emitCurrentEatery = new EventEmitter();
  @Input() foodsDetails: FoodDetailsResponseModel[] | null = null;
  @Input() eatery: EateryResponseModel | undefined;

  private readonly foodService = inject(FoodService);
  private readonly dialog = inject(MatDialog);

  deleteFood(foodId: number): void {
    this.foodService.deleteFood(foodId);
    this.emitCurrentEatery.emit();
  }

  openEditFoodDialog(food: FoodDetailsResponseModel): void {
    console.log(this.eatery);
    this.dialog.open(EditFoodDialogComponent, {
      width: '300px',
      enterAnimationDuration: 0,
      exitAnimationDuration: 0,
      data: {food: food, eatery: this.eatery},
    }).afterClosed().subscribe({
      next: (result) => {
        if (result.shouldClose) {
          this.emitCurrentEatery.emit();
        }
      }
    });
  }
}
