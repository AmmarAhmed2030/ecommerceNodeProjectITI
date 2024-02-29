import Joi from "joi";
export const addProductSchema = {
  body: Joi.object()
    .required()
    .keys({
      productName: Joi.string().alphanum().min(3).max(20),
      slug: Joi.string().min(3).max(3),
      stock: Joi.number(),
      finalPrice: Joi.number(),

      categoyId: Joi.string().hex().min(24).max(24),
      discount: Joi.number().min(0).max(100),
    }),
};
export const updateProductSchema = {
  body: Joi.object()
    .required()
    .keys({
      productName: Joi.string().alphanum().min(3).max(20),
      stock: Joi.number(),
      finalPrice: Joi.number(),
      categoyId: Joi.string().hex().min(24).max(24),
      discount: Joi.number().min(0).max(100),
      priceAfterDiscount: Joi.number(),
    }),
};
export const deleteProductSchema = {
  params: Joi.object()
    .required()
    .keys({
      productId: Joi.string().hex().min(24).max(24).required(),
    }),
};
export const getPaginationProductSchema = {
  query: Joi.object().required().keys({
    page: Joi.number().required(),
    limit: Joi.number().required(),
  }),
};
export const getProductSchema = {
  params: Joi.object()
    .required()
    .keys({
      productId: Joi.string().hex().min(24).max(24).required(),
    }),
};
export const getCategoryProductsSchema = {
  params: Joi.object()
    .required()
    .keys({
      categoryId: Joi.string().hex().min(24).max(24).required(),
    }),
};
