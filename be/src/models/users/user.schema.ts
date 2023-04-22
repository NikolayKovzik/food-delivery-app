import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Food } from '../food/food.schema';

@Schema({ versionKey: false })
export class User {
  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: false })
  refreshToken: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }] })
  favoriteFood: string[];
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
