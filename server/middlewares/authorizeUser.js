import helpers from '../helpers';

const { responseMessage } = helpers;

export default roleArray => async (request, response, next) => {
  try {
    const type = request.tokenType;
    if (!roleArray.some(roleName => type.includes(roleName.toLowerCase()))) return responseMessage(response, 403, { message: 'unauthorized user' });
    next();
  } catch (error) {
    /* istanbul ignore next-line */
    return responseMessage(response, 500, { message: error.message });
  }
};
