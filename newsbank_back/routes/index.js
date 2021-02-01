import express from 'express';
const { Router } = express;

import apiRouter from './api/index.js'

let router = Router();

router.use('/api', apiRouter);

export default router;