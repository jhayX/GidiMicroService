import express from 'express';
import password from './password';
import admin from './admin';
const router = express.Router();

router.use('/', password, admin);

export default router;
