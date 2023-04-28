import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Cart } from './schemes/cart.schema';

export class FullUserEntity {
  @ApiProperty({ example: '6407588c77660290910cfd16' })
  _id: Types.ObjectId;

  @ApiProperty({ example: 'Hans' })
  username: string;

  @ApiProperty({ example: 'hans@mail.ru' })
  email: string;

  @ApiProperty({ example: '1234qaz' })
  password: string;

  @ApiProperty({ example: '1234qaz' })
  refreshToken: string;

  @ApiProperty({
    example: [
      '64427a7714c2de82f8b93891',
      '64427ad614c2de82f8b93893',
      '644243d59a30fd843d831717',
    ],
  })
  favoriteFood: string[];

  @ApiProperty({
    example: { foodItemId: '644243d59a30fd843d831717', foodItemAmount: 3 },
  })
  cart: Cart[];
}

export class PartialUserEntity {
  @ApiProperty({ example: 'Hans' })
  username?: string;

  @ApiProperty({ example: 'hans@mail.ru' })
  email?: string;

  @ApiProperty({ example: '1234qaz' })
  password?: string;

  @ApiProperty({ example: '1234qaz' })
  refreshToken?: string;

  @ApiProperty({
    example: [
      '64427a7714c2de82f8b93891',
      '64427ad614c2de82f8b93893',
      '644243d59a30fd843d831717',
    ],
  })
  favoriteFood?: string[];

  @ApiProperty({
    example: { foodItemId: '644243d59a30fd843d831717', foodItemAmount: 3 },
  })
  cart?: Cart[];
}

export class PublicUserEntity {
  @ApiProperty({ example: '6407588c77660290910cfd16' })
  _id: Types.ObjectId;

  @ApiProperty({ example: 'Hans' })
  username: string;

  @ApiProperty({ example: 'hans@mail.ru' })
  email: string;

  @ApiProperty({
    example: [
      '64427a7714c2de82f8b93891',
      '64427ad614c2de82f8b93893',
      '644243d59a30fd843d831717',
    ],
  })
  favoriteFood: string[];

  @ApiProperty({
    example: { foodItemId: '644243d59a30fd843d831717', foodItemAmount: 3 },
  })
  cart: Cart[];
}
