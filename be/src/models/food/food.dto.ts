import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { config } from 'dotenv';

config();

export class FoodDto {
  @ApiProperty({
    example: 'Fried Chicken',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Spicy fried chicken',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 7.5,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: `${process.env.APP_HOSTNAME}:${
      process.env.PORT ? process.env.PORT : ''
    }/assets/food/fried_rice.jpg`,
  })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({
    example: 'spicy',
  })
  @IsNotEmpty()
  @IsString()
  type: string;
}
