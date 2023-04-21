import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { config } from 'dotenv';

config();

export class FoodEntity {
  @ApiProperty({ example: '6407588c77660290910cfd16' })
  _id: Types.ObjectId;

  @ApiProperty({
    example: 'Fried Chicken',
  })
  name: string;

  @ApiProperty({
    example: 'Spicy fried chicken',
  })
  description: string;

  @ApiProperty({
    example: 7.5,
  })
  price: number;

  @ApiProperty({
    example: `${process.env.APP_HOSTNAME}:${
      process.env.PORT ? process.env.PORT : ''
    }/assets/food/fried_rice.jpg`,
  })
  image: string;

  @ApiProperty({
    example: 'spicy',
  })
  type: string;
}
