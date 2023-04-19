import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
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
// import authResponses from '../auth/constants/swagger-responses';
import responses from './constants/swagger-responses';
import { FoodDto } from './food.dto';
import { FoodEntity } from './food.entity';
import { FoodService } from './food.service';

// const { UnauthorizedResponse, ForbiddenResponse } = authResponses;
const { getAllFood, getFoodById, addFood, updateFood, deleteFood } = responses;

@ApiTags('Food')
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @ApiBearerAuth()
  // @ApiUnauthorizedResponse(UnauthorizedResponse)
  // @ApiForbiddenResponse(ForbiddenResponse)
  @ApiOkResponse(getAllFood.ApiOkResponse)
  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAllFood(): Promise<FoodEntity[]> {
    return await this.foodService.getAllFood();
  }

  @ApiBearerAuth()
  // @ApiUnauthorizedResponse(UnauthorizedResponse)
  // @ApiForbiddenResponse(ForbiddenResponse)
  @ApiOkResponse(getFoodById.ApiOkResponse)
  @ApiNotFoundResponse(getFoodById.ApiNotFoundResponse)
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getFoodById(@Param('id') id: string): Promise<FoodEntity> {
    return await this.foodService.getFoodById(id);
  }

  @ApiBearerAuth()
  // @ApiUnauthorizedResponse(UnauthorizedResponse)
  // @ApiForbiddenResponse(ForbiddenResponse)
  @ApiCreatedResponse(addFood.ApiCreatedResponse)
  @ApiInternalServerErrorResponse(addFood.ApiInternalServerErrorResponse)
  // @UseGuards(JwtAuthGuard)
  @Post()
  async addFood(@Body() foodDto: FoodDto): Promise<FoodEntity> {
    return await this.foodService.addFood(foodDto);
  }

  @ApiBearerAuth()
  // @ApiUnauthorizedResponse(UnauthorizedResponse)
  // @ApiForbiddenResponse(ForbiddenResponse)
  @ApiOkResponse(updateFood.ApiOkResponse)
  @ApiNotFoundResponse(updateFood.ApiNotFoundResponse)
  @ApiInternalServerErrorResponse(updateFood.ApiInternalServerErrorResponse)
  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateFood(
    @Param('id') id: string,
    @Body() foodDto: FoodDto,
  ): Promise<FoodEntity> {
    return await this.foodService.updateFood(id, foodDto);
  }

  @ApiBearerAuth()
  // @ApiUnauthorizedResponse(UnauthorizedResponse)
  // @ApiForbiddenResponse(ForbiddenResponse)
  @ApiNoContentResponse()
  @ApiNotFoundResponse(deleteFood.ApiNotFoundResponse)
  @ApiInternalServerErrorResponse(deleteFood.ApiInternalServerErrorResponse)
  @HttpCode(StatusCodes.NO_CONTENT)
  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteFood(@Param('id') id: string): Promise<void> {
    await this.foodService.deleteFood(id);
  }
}
