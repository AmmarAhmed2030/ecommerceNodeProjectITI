import express from 'express';
import { validation } from '../../middleware/validation.js';
import { auth } from '../../middleware/auth.js';
import { makeOrder } from './controller/order.controller.js';
import { makeOrderSchema } from './order.validation.js';
const orderRoutes= express.Router();
orderRoutes.post('/makeOrder/:cartId',auth,validation(makeOrderSchema),makeOrder);


export default orderRoutes;