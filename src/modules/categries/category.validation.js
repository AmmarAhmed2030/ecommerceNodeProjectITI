import Joi from 'joi';
export const addCategorySchema = {
    body:Joi.object().required().keys({
        categoryName:Joi.string().alphanum().min(3).max(20),
    })
}
export const deleteCategorySchema = {
    params:Joi.object().required().keys({
        categoryId:Joi.string().hex().min(24).max(24).required(),
    })
}
export const updateCategorySchema = {
    params:Joi.object().required().keys({
        categoryId:Joi.string().hex().min(24).max(24).required(),
    })
}
export const getCategorySchema = {
    params:Joi.object().required().keys({
        categoryId:Joi.string().hex().min(24).max(24).required(),
    })
}