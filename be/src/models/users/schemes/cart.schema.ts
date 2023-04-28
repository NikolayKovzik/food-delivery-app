import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ versionKey: false, _id: false })
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Food' })
  foodItem: string;

  @Prop()
  foodItemAmount: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
