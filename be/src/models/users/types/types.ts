import { FoodEntity } from 'src/models/food/food.entity';

export type CompleteCartInformation = {
  food: FoodEntity[];
  totalCost: number;
  totalNumberOfFoodInCart: number;
};
