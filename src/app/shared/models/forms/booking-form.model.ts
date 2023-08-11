import { FormControl } from "@angular/forms";

import EateryResponseModel from "../responses/eatery-response.model";
import PreOrderedFoodModel from "../entities/pre-ordered-food.model";

export default interface BookingFormModel {
  eatery: FormControl<EateryResponseModel | null>;
  date: FormControl<Date | null>;
  arrivalTime: FormControl<string | null>;
  leavingTime: FormControl<string | null>;
  didOrder: FormControl<boolean | null>;
  preOrderedFoods: FormControl<PreOrderedFoodModel[] | null>;
}
