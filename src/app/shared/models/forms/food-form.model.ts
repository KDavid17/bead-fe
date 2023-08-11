import { FormControl } from "@angular/forms";
import IngredientResponseModel from "../responses/ingredient-response.model";

export default interface FoodFormModel {
  name: FormControl<string | null>;
  price: FormControl<number | null>;
  ingredients: FormControl<IngredientResponseModel[] | null>;
}
