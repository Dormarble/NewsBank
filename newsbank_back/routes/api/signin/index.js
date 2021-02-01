import express from 'express';
import passport from 'passport';
const { Router } = express;

import apiSigninHandler from '../../../controllers/api/signin/handler.js';
import apiSigninKeyRouter from './key/index.js';

const resCode = {
    SUCCESS: 0,
    NO_USER: 1,
    PW_NOT_MATCH: 2,
    SERVER_ERR: 3
};

const router = Router();

router.use('/key', apiSigninKeyRouter);
router.post('/', apiSigninHandler);

export default router