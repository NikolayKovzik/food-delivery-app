import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

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
    example: 'spicy',
  })
  type: string;
}
