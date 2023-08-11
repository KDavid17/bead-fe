import FoodDetailsResponseModel from "./food-details-response.model";

export default interface BookingDetailsResponseModel {
  id: number;
  eateryId: number;
  eateryName: string;
  startDate: Date;
  endDate: Date;
  foods: FoodDetailsResponseModel[];
}
