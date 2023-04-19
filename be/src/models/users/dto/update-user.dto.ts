import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Hans' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username?: string;

  @ApiProperty({ example: '1234qaz' })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password?: string;

  @ApiProperty({ example: 'hans@mail.ru' })
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODUxNDA5ODQsImlhdCI6MTQ4NTEzNzM4NCwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiIyOWFjMGMxOC0wYjRhLTQyY2YtODJmYy0wM2Q1NzAzMThhMWQiLCJhcHBsaWNhdGlvbklkIjoiNzkxMDM3MzQtOTdhYi00ZDFhLWFmMzctZTAwNmQwNWQyOTUyIiwicm9sZXMiOltdfQ.Mp0Pcwsz5VECK11Kf2ZZNF_SMKu5CgBeLN9ZOP04kZo',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken?: string;
}
