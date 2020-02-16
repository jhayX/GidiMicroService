import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import helpers from '../helpers';

dotenv.config();

const { responseMessage, findUser } = helpers;

export default (request, response, next) => {
  const token = request.params.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decoded) => {
      if (error) {
        const message = (error.name === 'TokenExpiredError') ? 'token expired' : 'invalid token';
        responseMessage(response, 401, { message });
      } else {
        const user = await findUser(decoded.id, response);
        if (user){
          request.userData = user;
          request.tokenType = decoded.type;
          return next();
        }
        else{
          return responseMessage(response, 404, { message: 'user not found' });
        }
      }
    });
  } else {
    responseMessage(response, 401, { message: 'no token provided' });
  }
};
