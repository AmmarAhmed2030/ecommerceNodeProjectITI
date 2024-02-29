import express from 'express';
import { auth } from '../../middleware/auth.js';
import upload from '../../utils/multer.js';
import {validation} from '../../middleware/validation.js'
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from './controller/category.controller.js';
import { addCategorySchema, deleteCategorySchema, getCategorySchema, updateCategorySchema } from './category.validation.js';
const categoryRoutes= express.Router();

categoryRoutes.post("/addCategory",auth,validation(addCategorySchema),upload.single('image'),addCategory);
categoryRoutes.delete("/deleteCategory/:categoryId",validation(deleteCategorySchema),auth,deleteCategory);
categoryRoutes.patch("/updateCategory/:categoryId",auth,validation(updateCategorySchema),upload.single('image'),updateCategory);
categoryRoutes.get("/getAllCategories",getAllCategories);
categoryRoutes.get("/getCategory/:categoryId",validation(getCategorySchema),getCategory);


export default categoryRoutes;