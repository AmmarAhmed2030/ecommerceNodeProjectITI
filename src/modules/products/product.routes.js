import express from 'express';


import upload from '../../utils/multer.js';
import { validation } from '../../middleware/validation.js';
import { auth } from '../../middleware/auth.js';

import { addProduct, deleteProduct, getAllProductsWithPagination, getAllWithCategoryId, getProduct, updateProduct } from './controller/product.controller.js';
import { addProductSchema, deleteProductSchema, getCategoryProductsSchema, getPaginationProductSchema, getProductSchema, updateProductSchema } from './product.validation.js';
 const productRoutes= express.Router();
// productRoutes.post("/product/addProduct",auth,addProduct);

productRoutes.post('/addProduct',auth,validation(addProductSchema),upload.single('image'),addProduct);
productRoutes.patch('/updateProduct/:productId',auth,validation(updateProductSchema),upload.single('image'),updateProduct);
productRoutes.delete('/deleteProduct/:productId',auth,validation(deleteProductSchema),deleteProduct);
productRoutes.get('/getWithPageAndLimit',validation(getPaginationProductSchema),getAllProductsWithPagination);
productRoutes.get('/getProduct/:productId',validation(getProductSchema),getProduct);
productRoutes.get('/getWithCatId/:categoryId',validation(getCategoryProductsSchema),getAllWithCategoryId);
export default productRoutes;