import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (payload, expiresIn) => {
  if (!expiresIn) return jwt.sign(payload, process.env.JWT_SECRET_KEY);
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
};

export default createToken;
