import express from 'express';
const { Router } = express;

import handlerApi from '../../controllers/api/handler.js';
import apiEconomyRouter from './economy/index.js';
import apiSignInRouter from './signin/index.js';
import apiSignOutRouter from './signout/index.js';
import apiSignUpRouter from './signup/index.js';

let router = Router();

router.get('/', handlerApi);

router.use('/signin', apiSignInRouter);
router.use('/signout', apiSignOutRouter);
router.use('/signup', apiSignUpRouter);
router.use('/economy', apiEconomyRouter);

export default router;