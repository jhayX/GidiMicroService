import models from '../db/models';

const { users } = models;
/**
 * @name findUser
 * @param {string} parameter - user input
 * @returns {object} user object
 */
const findUser = async (parameter) => {
  let param;
  if (/\D/.test(parameter) && /@.{2,15}\./.test(parameter)) {
    param = { email: parameter };
  } else {
    param = { id: parameter };
  }
  return users.findOne({ where: param });
};

export default findUser;
