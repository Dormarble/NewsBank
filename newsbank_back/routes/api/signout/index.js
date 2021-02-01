import express from 'express';
const { Router } = express;

import apiSignOutHandler from '../../../controllers/api/signout/handler.js';

const router = Router();

router.use('/', apiSignOutHandler);

export default router