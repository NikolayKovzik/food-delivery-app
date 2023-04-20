import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

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
}

export class PublicUserEntity {
  @ApiProperty({ example: '6407588c77660290910cfd16' })
  _id: Types.ObjectId;

  @ApiProperty({ example: 'Hans' })
  username: string;

  @ApiProperty({ example: 'hans@mail.ru' })
  email: string;
}
