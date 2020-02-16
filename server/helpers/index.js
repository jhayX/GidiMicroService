import findUser from './findUser';
import responseMessage from './responseMessage';
import createToken from './createToken';
import * as messages from './messages';
import sendMail from './sendMail';
import makeLowerCase from './customSanitizers';
import passwordGen from './passwordGenerator';

const { resetpasswordMessage,adminpasswordMessage } = messages;

const helpers = {
    responseMessage,
    findUser,
    createToken,
    resetpasswordMessage,
    sendMail,
    makeLowerCase,
    passwordGen,
    adminpasswordMessage
}
  
export default helpers;