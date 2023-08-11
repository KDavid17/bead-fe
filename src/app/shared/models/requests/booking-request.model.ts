import PreOrderedFoodModel from "../entities/pre-ordered-food.model";

export default interface BookingRequestModel {
  eateryId: number;
  userId: number;
  didOrder: boolean;
  startDate: Date;
  endDate: Date;
  preOrderedFoods: PreOrderedFoodModel[];
}
