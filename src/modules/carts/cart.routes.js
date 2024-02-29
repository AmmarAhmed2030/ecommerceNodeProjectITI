import express from 'express';
import { auth } from '../../middleware/auth.js';
import { applyCouponOnCart, createCart, updateCart } from './controller/cart.controller.js';

const cartRoutes= express.Router();

cartRoutes.post('/createCart',auth,createCart);
cartRoutes.patch('/updateCart/:cartId',auth,updateCart);
cartRoutes.patch('/applyCouponOnCart/:cartId/:code',applyCouponOnCart);

export default cartRoutes;