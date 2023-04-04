import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

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
}
