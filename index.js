<<<<<<< HEAD
import express from "express";
import initConnection from "./db/initConnection.js";
import userRoutes from "./src/modules/users/user.routes.js";
import dotenv from "dotenv";
import productRoutes from "./src/modules/products/product.routes.js";
import categoryRoutes from "./src/modules/categries/category.routes.js";
import couponRoutes from "./src/modules/coupons/coupon.routes.js";
import cartRoutes from "./src/modules/carts/cart.routes.js";
import orderRoutes from "./src/modules/orders/order.routes.js";
import cors from "cors";
dotenv.config();
initConnection();
const server = express();
server.use(cors());
server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: false }));
=======
import express from 'express';
import initConnection from './db/initConnection.js';
import userRoutes from './src/modules/users/user.routes.js';
import dotenv from 'dotenv'
import productRoutes from './src/modules/products/product.routes.js';
import categoryRoutes from './src/modules/categries/category.routes.js';
import couponRoutes from './src/modules/coupons/coupon.routes.js';
import cartRoutes from './src/modules/carts/cart.routes.js';
import orderRoutes from './src/modules/orders/order.routes.js';

import cors from 'cors'
dotenv.config();
initConnection();
const server =  express();
server.use(cors())

server.set('view engine','ejs');
server.use(express.urlencoded({extended:false}))
>>>>>>> 85eab177cfffccc45e6e976acbb5c970a703ca14
server.use(express.json());
server.use(userRoutes);
server.use(productRoutes);
server.use(categoryRoutes);
server.use(couponRoutes);
server.use(cartRoutes);
server.use(orderRoutes);

server.listen(3000);
