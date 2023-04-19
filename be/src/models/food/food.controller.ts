import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import authResponses from '../auth/constants/swagger-responses';
import responses from './constants/swagger-responses';
import { FoodDto } from './food.dto';
import { FoodEntity } from './food.entity';
import { FoodService } from './food.service';

const { UnauthorizedResponse, ForbiddenResponse } = authResponses;
const { getAllFood, getFoodById, addFood, updateFood, deleteFood } = responses;

@ApiTags('Food')
@ApiUnauthorizedResponse(UnauthorizedResponse)
@ApiForbiddenResponse(ForbiddenResponse)
@UseGuards(AccessTokenGuard)
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @ApiBearerAuth()
  @ApiOkResponse(getAllFood.ApiOkResponse)
  @Get()
  async getAllFood(): Promise<FoodEntity[]> {
    return await this.foodService.getAllFood();
  }

  @ApiBearerAuth()
  @ApiOkResponse(getFoodById.ApiOkResponse)
  @ApiNotFoundResponse(getFoodById.ApiNotFoundResponse)
  @Get(':id')
  async getFoodById(@Param('id') id: string): Promise<FoodEntity> {
    return await this.foodService.getFoodById(id);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse(addFood.ApiCreatedResponse)
  @ApiInternalServerErrorResponse(addFood.ApiInternalServerErrorResponse)
  @Post()
  async addFood(@Body() foodDto: FoodDto): Promise<FoodEntity> {
    return await this.foodService.addFood(foodDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse(updateFood.ApiOkResponse)
  @ApiNotFoundResponse(updateFood.ApiNotFoundResponse)
  @ApiInternalServerErrorResponse(updateFood.ApiInternalServerErrorResponse)
  @Put(':id')
  async updateFood(
    @Param('id') id: string,
    @Body() foodDto: FoodDto,
  ): Promise<FoodEntity> {
    return await this.foodService.updateFood(id, foodDto);
  }

  @ApiBearerAuth()
  @ApiNoContentResponse()
  @ApiNotFoundResponse(deleteFood.ApiNotFoundResponse)
  @ApiInternalServerErrorResponse(deleteFood.ApiInternalServerErrorResponse)
  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete(':id')
  async deleteFood(@Param('id') id: string): Promise<void> {
    await this.foodService.deleteFood(id);
  }
}
