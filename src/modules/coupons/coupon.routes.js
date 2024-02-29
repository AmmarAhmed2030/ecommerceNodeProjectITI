import express from 'express';

import { validation } from '../../middleware/validation.js';
import { auth } from '../../middleware/auth.js';
import { addCoupon, applyCouponOnProduct, deleteCoupon, getCoupons, updateCoupon } from './controller/coupon.controller.js';
import { addCouponSchema, applyCouponOnProductSchema, deleteCouponSchema, updateCouponSchema } from './coupon.validation.js';
const couponRoutes= express.Router();
couponRoutes.post('/addCoupon',auth,validation(addCouponSchema),addCoupon);
couponRoutes.patch('/updateCoupon/:code',auth,validation(updateCouponSchema),updateCoupon);
couponRoutes.delete('/deleteCoupon/:code',auth,validation(deleteCouponSchema),deleteCoupon);
couponRoutes.get('/coupons',getCoupons);
couponRoutes.patch('/applyCouponOnProduct',validation(applyCouponOnProductSchema),applyCouponOnProduct);


export default couponRoutes;