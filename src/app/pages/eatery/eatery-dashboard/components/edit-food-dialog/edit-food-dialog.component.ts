import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AlertService } from "../../../../../core/services/alert/alert.service";
import { FoodService } from "../../../../../services/food-service/food.service";
import { IngredientService } from "../../../../../services/ingredient-service/ingredient.service";
import { map } from "rxjs";
import FoodFormModel from "../../../../../shared/models/forms/food-form.model";
import IngredientResponseModel from "../../../../../shared/models/responses/ingredient-response.model";
import FoodRequestModel from "../../../../../shared/models/requests/food-request.model";

@Component({
  selector: 'app-edit-food-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-food-dialog.component.html',
  styleUrls: ['./edit-food-dialog.component.scss']
})
export class EditFoodDialogComponent {
  private readonly alertService = inject(AlertService);
  private readonly dialogRef = inject(MatDialogRef<EditFoodDialogComponent>);
  private readonly foodService = inject(FoodService);
  private readonly ingredientService = inject(IngredientService);

  data: any = inject(MAT_DIALOG_DATA);

  ingredients$ = this.ingredientService.getIngredients().pipe(
    map((ingredients) => {
      ingredients.forEach(ingredient => {
        ingredient.isChecked = this.data.food.ingredients.findIndex((i: IngredientResponseModel) =>
          i.id === ingredient.id) !== -1;

      });

      return ingredients;
    }));

  editFoodForm = new FormGroup<FoodFormModel>({
    name: new FormControl<string>(this.data.food.name, Validators.required),
    price: new FormControl<number>(this.data.food.price, [Validators.required, Validators.min(1)]),
    ingredients: new FormControl<IngredientResponseModel[]>(this.data.food.ingredients),
  });

  onCheckboxChange(ingredient: IngredientResponseModel): void {
    ingredient.isChecked = !ingredient.isChecked;

    let ingredients = this.editFoodForm.controls.ingredients.value ?? [];

    if (ingredient.isChecked) {
      ingredients = [...ingredients, ingredient]
    } else {
      const index = ingredients.findIndex(i => i.id === ingredient.id);

      if (index !== -1) {
        ingredients.splice(index, 1);
      }
    }

    this.editFoodForm.controls.ingredients.setValue(ingredients);
  }

  onSubmit() {
    if (this.editFoodForm.valid) {
      this.foodService.editFood(
        this.data.food.id,
        {
          eateryId: this.data.eatery.id,
          name: this.editFoodForm.value.name!,
          price: this.editFoodForm.value.price!,
          ingredients: this.editFoodForm.value.ingredients!,
        } as FoodRequestModel)

      this.dialogRef.close({shouldClose: true});

      return;
    }

    this.alertService.handleErrorMessage("Please fill the required fields!");
  }
}
