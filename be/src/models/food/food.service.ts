import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import exceptions from './constants/swagger-exceptions';
import { FoodEntity } from './food.entity';
import { Food, FoodDocument } from './food.schema';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name) private foodModel: Model<FoodDocument>) {}

  async getAllFood(): Promise<FoodEntity[]> {
    return await this.foodModel.find();
  }

  async getFoodById(id: string): Promise<FoodEntity> {
    isIdValid(id);

    const hotel = await this.foodModel.findById(id);
    if (!hotel) {
      throw new NotFoundException(exceptions.NotFound);
    }

    return hotel;
  }
}
