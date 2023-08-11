import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from "rxjs";

import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

import { FoodService } from "../../../../../services/food-service/food.service";
import { EateryFoodsComponent } from "../eatery-foods/eatery-foods.component";
import EateryResponseModel from "../../../../../shared/models/responses/eatery-response.model";
import FoodDetailsResponseModel from "../../../../../shared/models/responses/food-details-response.model";
import { AddFoodDialogComponent } from "../add-food-dialog/add-food-dialog.component";
import { EateryService } from "../../../../../services/eatery-service/eatery.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

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
    ReactiveFormsModule,
  ],
  templateUrl: './eatery-menu.component.html',
  styleUrls: ['./eatery-menu.component.scss']
})
export class EateryMenuComponent {
  @Output("getEateriesOfUser") getEateriesOfUser = new EventEmitter();
  @Input() eateries: EateryResponseModel[] | null = null;
  @Input() currentEatery: EateryResponseModel | undefined;

  private readonly foodService = inject(FoodService);
  private readonly dialog = inject(MatDialog);

  foodsDetails$: Observable<FoodDetailsResponseModel[]> | null = null;
  selectedEatery: EateryResponseModel | undefined;

  searchForm = new FormControl();

  constructor() {
    this.searchForm.setValue(this.currentEatery);
  }

  displayEateryName(eatery: EateryResponseModel): string {
    return eatery ? eatery.name : "";
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent): void {
    this.foodsDetails$ = this.foodService.getFoodsDetailsByEateryId(event.option.value.id);
    this.selectedEatery = event.option.value;
  }

  openAddFoodDialog(): void {
    this.dialog.open(AddFoodDialogComponent, {
      width: '300px',
      enterAnimationDuration: 0,
      exitAnimationDuration: 0,
      data: this.selectedEatery,
    }).afterClosed().subscribe({
      next: (result) => {
        if (result.shouldClose) {
          this.emitCurrentEatery();
        }
      }
    });
  }

  emitCurrentEatery(): void {
    this.getEateriesOfUser.emit({currentEatery: this.selectedEatery});
  }
}
