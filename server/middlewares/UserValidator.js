import expressValidator from 'express-validator/check';
import helpers from '../helpers';
import checkForErrors from './checkForErrors';
const { check } = expressValidator;

const { makeLowerCase } = helpers;

/**
 * @class UserValidator
 * @classdesc Provides validation middlewares for login and signup route
 */
export default class UserValidator {
   /**
  * Generic validator to be used by all others
  * @param {string} field
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
 static genericCheck(field) {
  return check(`${field}`)
    .exists().withMessage(`${field} is missing`)
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage(`${field} cannot be blank`);
}

  /**
  * Email validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkEmail() {
    return UserValidator.genericCheck('email')
      .trim()
      .isEmail()
      .withMessage('email is not valid')
      .customSanitizer(value => makeLowerCase(value));
  }

  /**
   *
   *
   * @static
   * @returns {array} of Check API middlewares
   * @memberof UserValidator
   */
  static EmailValidation() {
    return [
      UserValidator.checkEmail(),
      checkForErrors,
    ];
  }
}
