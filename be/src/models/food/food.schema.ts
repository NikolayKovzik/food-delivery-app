import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ versionKey: false })
export class Food {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, required: true })
  type: string;
}

export type FoodDocument = HydratedDocument<Food>;
export const FoodSchema = SchemaFactory.createForClass(Food);
