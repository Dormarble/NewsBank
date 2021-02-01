import express from 'express';
const { Router } = express;

import handlerApiEconomy from '../../../controllers/api/economy/handler.js';
import handlerApiEconomyId from '../../../controllers/api/economy/id/handler.js';

const router = Router();

router.get('/', handlerApiEconomy);
router.get('/:id', handlerApiEconomyId);

export default router;