import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BehaviorSubject, map, scan, switchMap } from "rxjs";

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";

import { EateryService } from "../../../services/eatery-service/eatery.service";
import BookingFormModel from "../../../shared/models/forms/booking-form.model";
import EateryResponseModel from "../../../shared/models/responses/eatery-response.model";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import FoodDetailsResponseModel from "../../../shared/models/responses/food-details-response.model";
import { FoodService } from "../../../services/food-service/food.service";
import IngredientResponseModel from "../../../shared/models/responses/ingredient-response.model";
import { IngredientService } from "../../../services/ingredient-service/ingredient.service";
import { MatTooltipModule } from "@angular/material/tooltip";
import PreOrderedFoodModel from "../../../shared/models/entities/pre-ordered-food.model";
import { BookService } from "../../../services/book-service/book.service";
import { AuthenticationService } from "../../../core/services/authentication/authentication.service";
import { AlertService } from "../../../core/services/alert/alert.service";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatCheckboxModule,
    MatCardModule,
    MatTooltipModule,
  ],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  private readonly alertService = inject(AlertService);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly bookingService = inject(BookService);
  private readonly eateryService = inject(EateryService);
  private readonly foodService = inject(FoodService);
  private readonly ingredientService = inject(IngredientService);

  disabledSubmit = false;

  eateryFoods$ = new BehaviorSubject<FoodDetailsResponseModel[]>([]).asObservable();
  filteredOptions = new BehaviorSubject<EateryResponseModel[]>([]).asObservable();

  eaterySearch: FormControl<string | null> = new FormControl("", Validators.required);
  bookingForm = new FormGroup<BookingFormModel>({
    eatery: new FormControl<EateryResponseModel | null>(null, Validators.required),
    date: new FormControl<Date | null>(null, Validators.required),
    arrivalTime: new FormControl<string | null>(null, Validators.required),
    leavingTime: new FormControl<string | null>(null, Validators.required),
    didOrder: new FormControl<boolean>({value: false, disabled: true}, Validators.required),
    preOrderedFoods: new FormControl<PreOrderedFoodModel[]>([]),
  });

  ngOnInit(): void {
    this.eaterySearch.valueChanges.subscribe({
      next: (value: string | null): void => {
        this.filteredOptions = this.eateryService.getEateriesByParam(value);
      }
    });
  }

  onOrderFoodChange(): void {
    this.bookingForm.controls.didOrder.setValue(this.bookingForm.controls.didOrder.value === true);

    if (this.bookingForm.controls.didOrder.value) {
      this.setEateryFoods();
    }
  }

  setEateryFoods(): void {
    const eateryId = this.bookingForm.controls.eatery.value?.id;

    if (eateryId) {
      this.eateryFoods$ = this.foodService.getFoodsDetailsByEateryId(eateryId);
    }
  }

  getIngredients(ingredients: IngredientResponseModel[]): string {
    return this.ingredientService.getIngredientsFormatted(ingredients);
  }

  scrollIntoView(action: string): void {
    const date: number = new Date().getHours();

    document.getElementById(`${date}-${action}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }

  displayEateryName(eatery: EateryResponseModel) {
    return eatery ? eatery.name : "";
  }

  clearFilteredOptions(): void {
    this.eaterySearch.reset();
    this.bookingForm.controls.eatery.reset();
    this.filteredOptions = new BehaviorSubject<EateryResponseModel[]>([]).asObservable();
    this.bookingForm.controls.didOrder.setValue(false);
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent): void {
    this.bookingForm.controls.eatery.setValue(event.option.value);
    this.bookingForm.controls.didOrder.setValue(false);
  }

  increaseQuantity(food: FoodDetailsResponseModel): void {
    let preOrderedFoods = this.bookingForm.controls.preOrderedFoods.value;

    if (!preOrderedFoods) {
      preOrderedFoods = [];
    }

    let index = preOrderedFoods.findIndex(pof => pof.foodId === food.id);

    if(index === -1) {
      preOrderedFoods.push({foodId: food.id, quantity: 0});

      index = preOrderedFoods.length - 1;
    }

    food.quantity = (food.quantity ?? 0) + 1;
    preOrderedFoods[index].quantity++;

    this.bookingForm.controls.preOrderedFoods.setValue(preOrderedFoods);
  }

  decreaseQuantity(food: FoodDetailsResponseModel): void {
    let preOrderedFoods = this.bookingForm.controls.preOrderedFoods.value;

    if (!preOrderedFoods) {
      preOrderedFoods = [];
    }

    if (food.quantity && food.quantity > 0) {
      const index = preOrderedFoods.findIndex(pof => pof.foodId === food.id);

      food.quantity--;
      preOrderedFoods[index].quantity--;

      if (food.quantity === 0) {
        preOrderedFoods.splice(index, 1);
      }

      this.bookingForm.controls.preOrderedFoods.setValue(preOrderedFoods);
    }
  }

  generateDate(date: Date, time: string): Date {
    const splitTime = time.split(':');

    let result = new Date(date.getFullYear(), date.getMonth(), date.getDate(), Number(splitTime[0]), Number(splitTime[1]));

    result.setUTCHours(Number(splitTime[0]));
    result.setUTCMinutes(Number(splitTime[1]));

    return result;
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const userId = this.authenticationService.getUserLoggedIn().sub;

      this.disabledSubmit = true;

      this.bookingService.postBooking({
        eateryId: this.bookingForm.value.eatery!.id,
        userId: userId,
        didOrder: this.bookingForm.controls.didOrder.value!,
        startDate: this.generateDate(this.bookingForm.value.date!, this.bookingForm.value.arrivalTime!),
        endDate: this.generateDate(this.bookingForm.value.date!, this.bookingForm.value.leavingTime!),
        preOrderedFoods: this.bookingForm.value.preOrderedFoods ?? [],
      })

      this.bookingForm.reset();
      this.disabledSubmit = false;

      return;
    }

    this.alertService.handleErrorMessage("Please fill the required fields!");
  }
}
