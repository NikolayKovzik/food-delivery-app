import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import authResponses from '../auth/constants/swagger-responses';
import responses from './constants/swagger-responses';
import { UserDto } from './dto/user.dto';
import { PublicUserEntity } from './user.entites';
import { UsersService } from './users.service';

const { getAllUsers, getUserById, deleteUser, updateUser } = responses;

const { UnauthorizedResponse, ForbiddenResponse } = authResponses;

@ApiTags('Users')
@ApiBearerAuth()
@ApiUnauthorizedResponse(UnauthorizedResponse)
@ApiForbiddenResponse(ForbiddenResponse)
@UseGuards(AccessTokenGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse(getAllUsers.ApiOkResponse)
  @Get()
  async getAllUsers(): Promise<PublicUserEntity[]> {
    return await this.usersService.getAll();
  }

  @ApiOkResponse(getUserById.ApiOkResponse)
  @ApiNotFoundResponse(getUserById.ApiNotFoundResponse)
  @ApiBadRequestResponse(getUserById.ApiBadRequestResponse)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<PublicUserEntity> {
    return await this.usersService.publicFindById(id);
  }

  @Get(':id/favorite-food')
  async getUserFavoriteFood(@Param('id') userId: string) {
    return await this.usersService.getUserFavoriteFood(userId);
  }

  @Patch(':userId/favorite-food/:foodId/add')
  async addUserFavoriteFoodItem(
    @Param('userId') userId: string,
    @Param('foodId') foodId: string,
  ) {
    return await this.usersService.addUserFavoriteFoodItem(userId, foodId);
  }

  @Patch(':userId/favorite-food/:foodId/delete')
  async removeUserFavoriteFoodItem(
    @Param('userId') userId: string,
    @Param('foodId') foodId: string,
  ) {
    return await this.usersService.removeUserFavoriteFoodItem(userId, foodId);
  }

  @Get(':id/cart')
  async getUserCart(@Param('id') userId: string) {
    return await this.usersService.getUserCart(userId);
  }

  @Patch(':userId/cart/:foodId/add-to-cart-from-main-page')
  async addFoodToCartFromMainPage(
    @Param('userId') userId: string,
    @Param('foodId') foodId: string,
  ): Promise<number> {
    return await this.usersService.addFoodToCartFromMainPage(userId, foodId);
  }

  @Patch(':userId/cart/:foodId/add-to-cart-from-details-page')
  async addFoodToCartFromDetailsPage(
    @Param('userId') userId: string,
    @Param('foodId') foodId: string,
    @Query('amount') amountOfFoodItems: string,
  ): Promise<number> {
    return await this.usersService.addFoodToCartFromDetailsPage(
      userId,
      foodId,
      +amountOfFoodItems,
    );
  }

  @Patch(':userId/cart/:foodId/delete')
  async removeFoodItemsFromCart(
    @Param('userId') userId: string,
    @Param('foodId') foodId: string,
    @Query('amount') amountOfFoodItems: string,
  ) {
    return await this.usersService.removeFoodItemsFromCart(
      userId,
      foodId,
      +amountOfFoodItems,
    );
  }

  @ApiOkResponse(deleteUser.ApiOkResponse)
  @ApiNotFoundResponse(deleteUser.ApiNotFoundResponse)
  @ApiBadRequestResponse(deleteUser.ApiBadRequestResponse)
  @Delete('/:id')
  async deleteUser(@Param('id') userId: string): Promise<PublicUserEntity> {
    return await this.usersService.deleteUser(userId);
  }

  @ApiOkResponse(updateUser.ApiOkResponse)
  @ApiNotFoundResponse(updateUser.ApiNotFoundResponse)
  @ApiBadRequestResponse(updateUser.ApiBadRequestResponse)
  @ApiConflictResponse(updateUser.ApiConflictResponse)
  @Put('/:id')
  async updateUser(
    @Param('id') userId: string,
    @Body() userDto: UserDto,
  ): Promise<PublicUserEntity> {
    return await this.usersService.publicUpdateUser(userId, userDto);
  }
}
