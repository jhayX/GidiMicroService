import express from 'express';
import middlewares from '../middlewares';
import AuthController from '../controllers/AuthController';
import path from 'path';

const app = express();

const { verifyToken, UserValidator } = middlewares;
const { resetpasswordEmail, resetPassword } = AuthController;
const { EmailValidation } = UserValidator;
const auth = express.Router();
const BASE_URL = '/auth';

/* Route responsible for sending password reset link to owners mail */
auth.post(`${BASE_URL}/passwordreset`,EmailValidation(), resetpasswordEmail);

/* Route responsible for password reset when mail has been sent */
auth.patch(`${BASE_URL}/passwordresetverify/:token`, verifyToken, resetPassword);

/* Route responsible for the view password reset when mail has been sent */
auth.get(`${BASE_URL}/passwordresetverify/:token`, (request, response) => {
    // response.status(200).send({
    //     message:'Welcome to Xcloud🔥',
    //     baseUrl: "api/v1" 
    // });
    response.sendFile(path.join(__dirname, '../../ui/reset.html'));
}); 

export default auth;
