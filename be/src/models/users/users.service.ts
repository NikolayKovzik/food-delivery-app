import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isIdValid } from '../../helpers/validation';
import exceptions from './constants/swagger-exceptions';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import {
  FullUserEntity,
  PartialUserEntity,
  PublicUserEntity,
} from './user.entites';
import { User, UserDocument } from './user.schema';

const { NotFound, Conflict } = exceptions;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<PublicUserEntity[]> {
    return await this.userModel.find({}, { password: 0, refreshToken: 0 });
  }

  async findById(userId: string): Promise<FullUserEntity> {
    isIdValid(userId);

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(NotFound);
    }
    return user;
  }

  async publicFindById(userId: string): Promise<PublicUserEntity> {
    const user = await this.findById(userId);
    return {
      _id: user._id,
      email: user.email,
      username: user.username,
    };
  }

  async getUserByEmail(email: string): Promise<FullUserEntity> {
    return await this.userModel.findOne({ email });
  }

  async createUser(
    body: UserDto,
  ): Promise<Omit<FullUserEntity, 'refreshToken'>> {
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

  async deleteUser(userId: string): Promise<PublicUserEntity> {
    isIdValid(userId);
    const deletedUser = await this.userModel
      .findByIdAndDelete(userId)
      .select('-password -refreshToken');
    if (!deletedUser) {
      throw new NotFoundException(NotFound);
    }
    return deletedUser;
  }

  async publicUpdateUser(
    userId: string,
    userDto: UserDto,
  ): Promise<PublicUserEntity> {
    isIdValid(userId);

    await this.checkUserForDatabaseMatches(
      userDto.username,
      userDto.email,
      userId,
    );

    const existingUser = await this.userModel
      .findByIdAndUpdate(userId, userDto, { new: true })
      .select('-password -refreshToken');
    if (!existingUser) {
      throw new NotFoundException(NotFound);
    }
    return existingUser;
  }

  async partialUpdateUser(
    userId: string,
    userEntity: PartialUserEntity,
  ): Promise<FullUserEntity> {
    isIdValid(userId);

    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      userEntity,
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
