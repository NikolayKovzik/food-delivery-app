import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isIdValid } from '../../helpers/validation';
import exceptions from './constants/swagger-exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { User, UserDocument } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

const { NotFound, Conflict } = exceptions;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.userModel.find();
  }

  async findById(userId: string): Promise<UserEntity> {
    isIdValid(userId);

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(NotFound);
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userModel.findOne({ email });
  }

  async createUser(body: CreateUserDto): Promise<UserEntity> {
    await this.checkUserForDatabaseMatches(body.username, body.email);
    const hashedPassword = await bcrypt.hash(
      body.password,
      parseInt(process.env.CRYPT_SALT),
    );
    const newUser = await new this.userModel({
      ...body,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async deleteUser(userId: string): Promise<UserEntity> {
    isIdValid(userId);
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundException(NotFound);
    }
    return deletedUser;
  }

  async fullUpdateUser(
    userId: string,
    createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    isIdValid(userId);

    await this.checkUserForDatabaseMatches(
      createUserDto.username,
      createUserDto.email,
      userId,
    );

    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      createUserDto,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(NotFound);
    }
    return existingUser;
  }

  async partialUpdateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    isIdValid(userId);

    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(NotFound);
    }
    return existingUser;
  }

  async checkUserForDatabaseMatches(
    username: string,
    email: string,
    userId?: string,
  ): Promise<void | never> {
    const userByName = await this.userModel.findOne({
      username,
    });
    const userByEmail = await this.userModel.findOne({ email });

    if (userId) {
      if (
        (userByName && userByName._id.toString() !== userId) ||
        (userByEmail && userByEmail._id.toString() !== userId)
      ) {
        throw new ConflictException(Conflict);
      }

      return;
    }

    // if (userByName || userByEmail) {
    //   throw new ConflictException(Conflict);
    // }
  }
}
