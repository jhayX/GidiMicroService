import expressValidator from 'express-validator/check';
import helpers from '../helpers';

const { validationResult } = expressValidator;
const { responseMessage } = helpers;

export default (request, response, next) => {
  let errors = '';
  const errorFormatter = ({ msg, param }) => {
    errors = msg;
    console.log('ghjk',errors, msg)
    return errors;
  };
  const validationResults = validationResult(request).array({ onlyFirstError: true });
  validationResults.forEach(resultObject => errorFormatter(resultObject));
  if (Object.keys(errors).length > 0) {
    responseMessage(response, 400, { message:errors });
  } else {
    next();
  }
};
