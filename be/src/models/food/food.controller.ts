import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import authResponses from '../auth/constants/swagger-responses';
import responses from './constants/swagger-responses';
import { FoodEntity } from './food.entity';
import { FoodService } from './food.service';

const { UnauthorizedResponse, ForbiddenResponse } = authResponses;
const { getAllFood, getFoodById, addFood, updateFood, deleteFood } = responses;

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse(UnauthorizedResponse)
  @ApiForbiddenResponse(ForbiddenResponse)
  @ApiOkResponse(getAllFood.ApiOkResponse)
  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAllHotelsPublic(): Promise<FoodEntity[]> {
    return await this.foodService.getAllFood();
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse(UnauthorizedResponse)
  @ApiForbiddenResponse(ForbiddenResponse)
  @ApiOkResponse(getFoodById.ApiOkResponse)
  @ApiNotFoundResponse(getFoodById.ApiNotFoundResponse)
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getHotelById(@Param('id') id: string): Promise<FoodEntity> {
    return await this.foodService.getFoodById(id);
  }
}
