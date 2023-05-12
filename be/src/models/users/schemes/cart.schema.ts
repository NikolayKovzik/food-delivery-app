import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FoodItem, FoodItemSchema } from './food-item.schema';

@Schema({ versionKey: false, _id: false })
export class Cart {
  @Prop({ type: [FoodItemSchema], required: true })
  foodItems: FoodItem[];

  @Prop({ type: Number, required: true })
  totalCost: number;

  @Prop({ type: Number, required: true })
  totalNumberOfFoodInCart: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
