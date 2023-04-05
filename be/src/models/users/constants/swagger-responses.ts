import { UserEntity } from '../user.entity';
import exceptions from './swagger-exceptions';

const { InvalidIdBadRequest, InvalidBodyBadRequest, NotFound, Conflict } =
  exceptions;

const responses = {
  getAllUsers: {
    ApiOkResponse: { type: UserEntity, isArray: true },
  },
  getUserById: {
    ApiOkResponse: { type: UserEntity },
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
    ApiCreatedResponse: { type: UserEntity },
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
      type: UserEntity,
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
      type: UserEntity,
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
