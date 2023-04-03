import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

const { InvalidIdBadRequest } = exceptions;

export function isIdValid(id: string): void | never {
  if (!Types.ObjectId.isValid(id)) {
    throw new BadRequestException(InvalidIdBadRequest);
  }
}
