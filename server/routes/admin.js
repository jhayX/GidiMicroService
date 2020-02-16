import express from 'express';
import middlewares from '../middlewares';
import AuthController from '../controllers/AuthController';

const { verifyToken, UserValidator,authorizeUser } = middlewares;
const { resetAdminPassword } = AuthController;
const { EmailValidation } = UserValidator;

const admin = express.Router();
const BASE_URL = '/admin';

// Route to change user status (activate or deactivate)
admin.patch(`${BASE_URL}/resetpassword/:token`, verifyToken, authorizeUser(['super_admin']), EmailValidation(),resetAdminPassword);

export default admin;
