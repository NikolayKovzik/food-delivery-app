import { PublicUserEntity } from '../user.entites';
import exceptions from './swagger-exceptions';

const { InvalidIdBadRequest, InvalidBodyBadRequest, NotFound, Conflict } =
  exceptions;

const responses = {
  getAllUsers: {
    ApiOkResponse: { type: PublicUserEntity, isArray: true },
  },
  getUserById: {
    ApiOkResponse: { type: PublicUserEntity },
    ApiNotFoundResponse: {
      schema: {
        type: 'object',
        example: NotFound,
      },
      description: 'User was not found',
    },
    ApiBadRequestResponse: {
      schema: {
        type: 'object',
        example: InvalidIdBadRequest,
      },
      description: 'Invalid userId',
    },
  },
  createUser: {
    ApiCreatedResponse: { type: PublicUserEntity },
    ApiBadRequestResponse: {
      schema: {
        type: 'object',
        example: InvalidBodyBadRequest,
      },
      description: 'Invalid body',
    },
    ApiConflictResponse: {
      schema: {
        type: 'object',
        example: Conflict,
      },
      description: 'Conflicting Request',
    },
  },
  deleteUser: {
    ApiOkResponse: {
      type: PublicUserEntity,
      description: 'User was successfully deleted',
    },
    ApiNotFoundResponse: {
      schema: {
        type: 'object',
        example: NotFound,
      },
      description: 'User was not found',
    },
    ApiBadRequestResponse: {
      schema: {
        type: 'object',
        example: InvalidIdBadRequest,
      },
      description: 'Invalid userId',
    },
  },
  updateUser: {
    ApiOkResponse: {
      type: PublicUserEntity,
      description: 'User has been  successfully updated',
    },
    ApiNotFoundResponse: {
      schema: {
        type: 'object',
        example: NotFound,
      },
      description: 'User was not found',
    },
    ApiBadRequestResponse: {
      schema: {
        type: 'object',
        example: InvalidBodyBadRequest,
      },
      description: 'Invalid body',
    },
    ApiConflictResponse: {
      schema: {
        type: 'object',
        example: Conflict,
      },
      description: 'Conflicting Request',
    },
  },
};

export default responses;
