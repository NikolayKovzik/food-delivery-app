import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food, FoodDocument } from './food.schema';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name) private userModel: Model<FoodDocument>) {}
}
