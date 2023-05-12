import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ versionKey: false, _id: false })
export class FoodItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true })
  foodItem: string;

  @Prop({ type: Number, required: true })
  foodItemCounter: number;
}

export const FoodItemSchema = SchemaFactory.createForClass(FoodItem);
