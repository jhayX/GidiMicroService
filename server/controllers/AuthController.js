import bcrypt from 'bcryptjs';
import helpers from '../helpers';
import models from '../db/models';

const { findUser,responseMessage,createToken,resetpasswordMessage,sendMail,passwordGen,adminpasswordMessage} = helpers;
const { users }=models;
export default class AuthController{

 /**
 *
 *
 * @static
 * @param {object} request
 * @param {object} response
 * @returns {json} - json
 * @memberof AuthController
 */
static async resetpasswordEmail(request, response) {
    const { email } = request.body;
    try {
    const user = await findUser(email, response);
    if(!user){
      return responseMessage(response, 400, { status: 'failure', message: 'email does not exist.' });
    }
    const { id, surname } = user;
    const token = createToken({ id }, '2h');
    const message = resetpasswordMessage(surname, token);
    await sendMail(process.env.ADMIN_MAIL, email, message);
    return responseMessage(response, 200, { status: 'success', message: 'you will receive a link in your mail shortly to proceed' });
    } 
    catch (error) {
      console.log('errr', error)
    return responseMessage(response, 500, { message: error});
    }
}

  /**
 *
 *
 * @static
 * @param {object} request
 * @param {object} response
 * @returns {json} - json
 * @memberof AuthController
 */
static async resetPassword(request, response) {
    try {
      const { id } = request.userData;
      const password = bcrypt.hashSync(request.body.password, 10);
      await users.update({ password }, { where: { id } });
      return responseMessage(response, 200, { status: 'success', message: 'password changed successfully.' });
    } catch (error) {
      /* istanbul ignore next-line */
      return responseMessage(response, 500, { message: error.message });
    }
  }

  /**
   *
   *
   * @static
   * @param {object} request
   * @param {object} response
   * @returns {json} - json
   * @memberof AuthController
   */
  static async resetAdminPassword(request, response) {
    const { email } = request.body;
    try {
    const user = await findUser(email, response);
    if(!user){
      return responseMessage(response, 400, { status: 'failure', message: 'email does not exist.' });
    }
    const { id, surname } = user;
    const token = createToken({ id }, '2h');
    const pgen = passwordGen(surname);
    const password = bcrypt.hashSync(pgen, 10);
    console.log('passssp',pgen)
    await users.update({ password }, { where: { id } });
    const message = adminpasswordMessage(surname, token, pgen);
    await sendMail(process.env.ADMIN_MAIL, email, message);
    return responseMessage(response, 200, { status: 'success', message: `A new password will be sent shortly` });
    } 
    catch (error) {
      console.log('errr', error)
    return responseMessage(response, 500, { message: error});
    }
  }
};