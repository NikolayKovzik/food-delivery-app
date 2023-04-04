const exceptions = {
  InvalidIdBadRequest: {
    status: 400,
    message:
      'Invalid Id. Id length must be 24 characters, and include only numbers and a-f (A-F) letters of the Latin alphabet',
    error: 'Bad Request',
  },
};

export default exceptions;
