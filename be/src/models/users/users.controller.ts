import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
// import authResponses from '../auth/constants/swagger-responses';
import responses from './constants/swagger-responses';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

const { getAllUsers, getUserById, deleteUser, createUser, updateUser } =
  responses;

// const { UnauthorizedResponse, ForbiddenResponse } = authResponses;

@ApiTags('Users')
@ApiBearerAuth()
// @ApiUnauthorizedResponse(UnauthorizedResponse)
// @ApiForbiddenResponse(ForbiddenResponse)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse(getAllUsers.ApiOkResponse)
  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersService.getAll();
  }

  @ApiOkResponse(getUserById.ApiOkResponse)
  @ApiNotFoundResponse(getUserById.ApiNotFoundResponse)
  @ApiBadRequestResponse(getUserById.ApiBadRequestResponse)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findById(id);
  }

  @ApiCreatedResponse(createUser.ApiCreatedResponse)
  @ApiBadRequestResponse(createUser.ApiBadRequestResponse)
  @ApiConflictResponse(createUser.ApiConflictResponse)
  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.createUser(body);
  }

  @ApiOkResponse(deleteUser.ApiOkResponse)
  @ApiNotFoundResponse(deleteUser.ApiNotFoundResponse)
  @ApiBadRequestResponse(deleteUser.ApiBadRequestResponse)
  @Delete('/:id')
  async deleteUser(@Param('id') userId: string): Promise<UserEntity> {
    return await this.usersService.deleteUser(userId);
  }

  @ApiOkResponse(updateUser.ApiOkResponse)
  @ApiNotFoundResponse(updateUser.ApiNotFoundResponse)
  @ApiBadRequestResponse(updateUser.ApiBadRequestResponse)
  @ApiConflictResponse(updateUser.ApiConflictResponse)
  @Put('/:id')
  async updateUser(
    @Param('id') userId: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return await this.usersService.fullUpdateUser(userId, createUserDto);
  }
}
