import express from 'express';
const { Router } = express;

import apiSignUpHandler from '../../../controllers/api/signup/handler.js';

const router = Router();

router.post('/', apiSignUpHandler);

export default router