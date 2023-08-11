import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { map } from "rxjs";

import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";

import FoodFormModel from "../../../../../shared/models/forms/food-form.model";
import EateryResponseModel from "../../../../../shared/models/responses/eatery-response.model";
import FoodRequestModel from "../../../../../shared/models/requests/food-request.model";

import { AlertService } from "../../../../../core/services/alert/alert.service";
import { FoodService } from "../../../../../services/food-service/food.service";
import { IngredientService } from "../../../../../services/ingredient-service/ingredient.service";
import { MatCheckboxModule } from "@angular/material/checkbox";
import IngredientResponseModel from "../../../../../shared/models/responses/ingredient-response.model";

@Component({
  selector: 'app-add-food-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './add-food-dialog.component.html',
  styleUrls: ['./add-food-dialog.component.scss']
})
export class AddFoodDialogComponent {
  private readonly alertService = inject(AlertService);
  private readonly dialogRef = inject(MatDialogRef<AddFoodDialogComponent>);
  private readonly foodService = inject(FoodService);
  private readonly ingredientService = inject(IngredientService);

  eatery: EateryResponseModel = inject(MAT_DIALOG_DATA);

  ingredients$ = this.ingredientService.getIngredients().pipe(
    map((ingredients) => {
      ingredients.forEach(ingredient => ingredient.isChecked = false);

      return ingredients;
    }));

  addFoodForm = new FormGroup<FoodFormModel>({
    name: new FormControl<string | null>(null, Validators.required),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    ingredients: new FormControl<IngredientResponseModel[] | null>(null),
  });

  onCheckboxChange(ingredient: IngredientResponseModel): void {
    ingredient.isChecked = !ingredient.isChecked;

    let ingredients = this.addFoodForm.controls.ingredients.value ?? [];

    if (ingredient.isChecked) {
      ingredients = [...ingredients, ingredient]
    } else {
      const index = ingredients.findIndex(i => i.id === ingredient.id);

      if (index !== -1) {
        ingredients.splice(index, 1);
      }
    }

    this.addFoodForm.controls.ingredients.setValue(ingredients);
  }

  onSubmit() {
    if (this.addFoodForm.valid) {
      this.foodService.addFood({
        eateryId: this.eatery.id,
        name: this.addFoodForm.value.name!,
        price: this.addFoodForm.value.price!,
        ingredients: this.addFoodForm.value.ingredients!,
      } as FoodRequestModel)

      this.dialogRef.close({shouldClose: true});

      return;
    }

    this.alertService.handleErrorMessage("Please fill the required fields!");
  }
}
