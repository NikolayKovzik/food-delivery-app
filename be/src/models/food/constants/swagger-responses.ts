import exceptions from 'src/models/food/constants/swagger-exceptions';
import { FoodEntity } from '../food.entity';

const { NotFound, InternalServerError } = exceptions;

const responses = {
  getAllFood: {
    ApiOkResponse: { type: FoodEntity, isArray: true },
  },
  getFoodById: {
    ApiOkResponse: { type: FoodEntity },
    ApiNotFoundResponse: {
      schema: {
        type: 'object',
        example: NotFound,
      },
    },
  },
  addFood: {
    ApiCreatedResponse: { type: FoodEntity },
    ApiInternalServerErrorResponse: {
      schema: {
        type: 'object',
        example: InternalServerError,
      },
    },
  },
  updateFood: {
    ApiOkResponse: {
      type: FoodEntity,
    },
    ApiNotFoundResponse: {
      schema: {
        type: 'object',
        example: NotFound,
      },
    },
    ApiInternalServerErrorResponse: {
      schema: {
        type: 'object',
        example: InternalServerError,
      },
    },
  },
  deleteFood: {
    ApiNotFoundResponse: {
      schema: {
        type: 'object',
        example: NotFound,
      },
    },
    ApiInternalServerErrorResponse: {
      schema: {
        type: 'object',
        example: InternalServerError,
      },
    },
  },
  getFilters: {
    ApiOkResponse: {
      type: 'array',
      items: {
        type: 'string',
      },
      example: ['spicy', 'salt', 'hot'],
    },
    ApiNotFoundResponse: {
      schema: {
        type: 'object',
        example: NotFound,
      },
    },
  },
};

export default responses;
