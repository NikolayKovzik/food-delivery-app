import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FoodSchema, Food } from 'src/models/food/food.schema';
import { Document } from 'mongoose';

@Schema({ versionKey: false, _id: false })
export class FoodItem {
  @Prop({ type: FoodSchema, required: true })
  foodItem: Food;

  @Prop({ type: Number, required: true })
  foodItemCounter: number;
}

export type FoodDocument = Food & Document;
export const FoodItemSchema = SchemaFactory.createForClass(FoodItem);
