import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodController } from './food.controller';
import { Food, FoodSchema } from './food.schema';
import { FoodService } from './food.service';

@Module({
  controllers: [FoodController],
  providers: [FoodService],
  imports: [
    MongooseModule.forFeature([
      { name: Food.name, schema: FoodSchema, collection: 'food' },
    ]),
  ],
})
export class FoodModule {}
