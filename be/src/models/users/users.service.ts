import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { isIdValid } from '../../helpers/validation';
import userExceptions from './constants/swagger-exceptions';
import foodExceptions from '../food/constants/swagger-exceptions';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import {
  FullUserEntity,
  PartialUserEntity,
  PublicUserEntity,
} from './user.entites';
import { User, UserDocument } from './schemes/user.schema';
import { Food, FoodDocument } from '../food/food.schema';
import { CompleteCartInformation } from './types/types';

const { NotFound, Conflict } = userExceptions;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Food.name) private foodModel: Model<FoodDocument>,
  ) {}

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
    const user = await this.userModel.findById(userId, {
      password: 0,
      refreshToken: 0,
    });

    if (!user) {
      throw new NotFoundException(NotFound);
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<FullUserEntity> {
    return await this.userModel.findOne({ email });
  }

  async getUserFavoriteFood(userId: string): Promise<string[]> {
    const user = await this.userModel
      .findById(userId, { password: 0, refreshToken: 0 })
      .populate('favoriteFood');
    return user.favoriteFood;
  }

  async addUserFavoriteFoodItem(userId: string, foodId: string): Promise<Food> {
    const favFoodItem = await this.foodModel.findById(foodId);
    if (!favFoodItem) {
      throw new NotFoundException(foodExceptions.NotFound);
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(userExceptions.NotFound);
    }

    await user.updateOne({
      $addToSet: {
        favoriteFood: foodId,
      },
    });

    return favFoodItem;
  }

  async removeUserFavoriteFoodItem(
    userId: string,
    foodId: string,
  ): Promise<Food> {
    const favFoodItem = await this.foodModel.findById(foodId);
    if (!favFoodItem) {
      throw new NotFoundException(userExceptions.NotFound);
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(userExceptions.NotFound);
    }

    await user.updateOne({
      $pull: {
        favoriteFood: foodId,
      },
    });

    return favFoodItem;
  }

  async addFoodToCartAndGetTotalAmount(
    userId: string,
    foodItemId: string,
    amountOfFoodItems: number,
  ): Promise<number> {
    const foodItem = await this.foodModel.findById(foodItemId);

    if (!foodItem) {
      throw new NotFoundException(foodExceptions.NotFound);
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(userExceptions.NotFound);
    }

    await this.addFoodItemsToCart(userId, foodItemId, amountOfFoodItems);

    // return await this.getTotalNumberOfFoodInCart(userId);
    return 333;
  }

  async getTotalNumberOfFoodInCart(userId: string): Promise<number> {
    const [{ totalNumberOfFoodInCart }] = await this.userModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: '$temp',
          totalNumberOfFoodInCart: {
            $sum: { $sum: '$cart.foodItemCounter' },
          },
        },
      },
    ]);

    return totalNumberOfFoodInCart;
  }

  async addFoodToCartFromOrderPage(
    userId: string,
    foodId: string,
  ): Promise<CompleteCartInformation> {
    await this.addFoodItemsToCart(userId, foodId, 1);
    return await this.getCompleteInformationAboutCart(userId);
  }

  async removeFoodFromCartFromOrderPage(
    userId: string,
    foodId: string,
  ): Promise<CompleteCartInformation> {
    await this.removeFoodItemsFromCart(userId, foodId, 1);
    return await this.getCompleteInformationAboutCart(userId);
  }

  async getCompleteInformationAboutCart(
    userId: string,
  ): Promise<CompleteCartInformation> {
    const [fullCartInfo] = await this.userModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      { $unwind: '$cart' },
      { $addFields: { foodItemId: { $toObjectId: '$cart.foodItem' } } },
      {
        $lookup: {
          from: 'food',
          localField: 'foodItemId',
          foreignField: '_id',
          as: 'cart.foodItem',
        },
      },
      {
        $project: {
          foodItem: { $arrayElemAt: ['$cart.foodItem', 0] },
          foodItemCounter: '$cart.foodItemCounter',
        },
      },
      {
        $group: {
          _id: '$_id',
          food: {
            $push: '$$ROOT',
          },
          totalCost: {
            $sum: {
              $multiply: ['$foodItem.price', '$foodItemCounter'],
            },
          },
          totalNumberOfFoodInCart: {
            $sum: { $sum: '$foodItemCounter' },
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    if (!fullCartInfo) {
      return {
        food: [],
        totalCost: 0,
        totalNumberOfFoodInCart: 0,
      };
    }

    return fullCartInfo;
  }

  async addFoodItemsToCart(
    userId: string,
    foodItemId: string,
    amountOfFoodItems: number,
  ): Promise<void> {
    await this.userModel.updateOne({ _id: userId }, [
      {
        $set: {
          'cart.foodItems': {
            $cond: [
              { $in: [foodItemId, '$cart.foodItems.foodItem'] },
              {
                $map: {
                  input: '$cart.foodItems',
                  in: {
                    $cond: [
                      { $eq: ['$$this.foodItem', foodItemId] },
                      {
                        foodItem: '$$this.foodItem',
                        foodItemCounter: {
                          $add: ['$$this.foodItemCounter', amountOfFoodItems],
                        },
                      },
                      '$$this',
                    ],
                  },
                },
              },
              {
                $concatArrays: [
                  '$cart.foodItems',
                  [
                    {
                      foodItem: foodItemId,
                      foodItemCounter: amountOfFoodItems,
                    },
                  ],
                ],
              },
            ],
          },
        },
      },
    ]);
  }

  async removeFoodItemsFromCart(
    userId: string,
    foodItemId: string,
    amountOfFoodItems: number,
  ): Promise<void> {
    //!delete or replace this checks
    const foodItem = await this.foodModel.findById(foodItemId);
    if (!foodItem) {
      throw new NotFoundException(userExceptions.NotFound);
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(userExceptions.NotFound);
    }

    await this.userModel.updateOne({ _id: userId }, [
      {
        $set: {
          cart: {
            $reduce: {
              input: '$cart',
              initialValue: [],
              in: {
                $cond: [
                  {
                    $eq: ['$$this.foodItem', foodItemId],
                  },
                  {
                    $cond: [
                      { $gt: ['$$this.foodItemCounter', amountOfFoodItems] },
                      {
                        $concatArrays: [
                          '$$value',
                          [
                            {
                              $mergeObjects: [
                                '$$this',
                                {
                                  foodItemCounter: {
                                    $subtract: [
                                      '$$this.foodItemCounter',
                                      amountOfFoodItems,
                                    ],
                                  },
                                },
                              ],
                            },
                          ],
                        ],
                      },
                      '$$value',
                    ],
                  },
                  { $concatArrays: ['$$value', ['$$this']] },
                ],
              },
            },
          },
        },
      },
    ]);
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
      cart: {
        foodItems: [],
        totalCost: 0,
        totalNumberOfFoodInCart: 0,
      },
      password: hashedPassword,
    });
    return await newUser.save();
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
