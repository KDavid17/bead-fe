import IngredientResponseModel from "../responses/ingredient-response.model";

export default interface FoodRequestModel {
  eateryId: number;
  name: string;
  price: number;
  ingredients: IngredientResponseModel[] | null;
}
