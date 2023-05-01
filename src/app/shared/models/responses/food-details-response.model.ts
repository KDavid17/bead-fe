import FoodResponseModel from "./food-response.model";
import IngredientResponseModel from "./ingredient-response.model";

export default interface FoodDetailsResponseModel extends FoodResponseModel {
  ingredients: IngredientResponseModel[];
}
