import express from 'express';
const router = express.Router();

import apiSigninKeyHandler from '../../../../controllers/api/signin/key/handler.js';

router.post('/', apiSigninKeyHandler);

export default router