import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isIdValid } from '../../helpers/validation';
import exceptions from './constants/swagger-exceptions';
import { FoodDto } from './food.dto';
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

    const food = await this.foodModel.findById(id);
    if (!food) {
      throw new NotFoundException(exceptions.NotFound);
    }

    return food;
  }

  async addFood(foodDto: FoodDto): Promise<FoodEntity> {
    const food = await new this.foodModel(foodDto);
    return food.save();
  }

  async updateFood(id: string, foodDto: FoodDto): Promise<FoodEntity> {
    isIdValid(id);
    const updatedFood = await this.foodModel.findByIdAndUpdate(id, foodDto, {
      new: true,
    });

    if (!updatedFood) {
      throw new NotFoundException(exceptions.NotFound);
    }

    return updatedFood;
  }

  async deleteFood(id): Promise<void> {
    isIdValid(id);

    const deletedFood = await this.foodModel.findByIdAndDelete(id);
    if (!deletedFood) {
      throw new NotFoundException(exceptions.NotFound);
    }
  }

  async getListOfFilters(): Promise<string[]> {
    return await this.foodModel.distinct('type');
  }
}
