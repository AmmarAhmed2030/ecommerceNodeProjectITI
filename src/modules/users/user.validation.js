import Joi from "joi";
export const addUserSchema = {
  body: Joi.object()
    .required()
    .keys({
      userName: Joi.string().alphanum().min(3).max(30).required(),
      age: Joi.number().min(15).max(50).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "eg"] } })
        .required(),
      gender: Joi.string().required(),
      password: Joi.string()
        .pattern(new RegExp(/^[A-Z][a-z0-9]{3,8}$/))
        .required(),
      CPassword: Joi.ref("password"),
      role: Joi.string().min(3).max(10).required(),
      city: Joi.string().min(3).max(15).required(),
      country: Joi.string().min(3).max(15).required(),
      street: Joi.string().min(3).max(15).required(),
    }),
};
export const signInSchema = {
  body: Joi.object()
    .required()
    .keys({
      password: Joi.string()
        .pattern(new RegExp(/^[A-Z][a-z0-9]{3,8}$/))
        .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "eg"] } })
        .required(),
    }),
};
export const deactivateUserSchema = {
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().hex().min(24).max(24).required(),
    }),
};
export const activateUserSchema = {
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().hex().min(24).max(24).required(),
    }),
};
export const resetPasswordSchema = {
  body: Joi.object()
    .required()
    .keys({
      oldPassword: Joi.string()
        .pattern(new RegExp(/^[A-Z][a-z0-9]{3,8}$/))
        .required(),
      password: Joi.string()
        .pattern(new RegExp(/^[A-Z][a-z0-9]{3,8}$/))
        .required(),
      CPassword: Joi.ref("password"),
    }),
};
export const forgetPasswordSchema = {
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "eg"] } })
        .required(),
    }),
};
export const deleteUserSchema = {
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().hex().min(24).max(24).required(),
    }),
};
export const searchUserSchema = {
  params: Joi.object()
    .required()
    .keys({ id: Joi.string().hex().min(24).max(24).required() }),
};
export const updateUserValidation = {
  body: Joi.object()
    .required()
    .keys({
      userName: Joi.string().alphanum().min(3).max(10).required(),
      age: Joi.number().min(15).max(50).required(),
      gender: Joi.string().required(),
      city: Joi.string().min(3).max(15).required(),
      country: Joi.string().min(3).max(15).required(),
      street: Joi.string().min(3).max(15).required(),
    }),
};
// export const searchNameAgeSchema = {
//     body:Joi.object().required().keys({
//         startWith:Joi.string().alphanum().max(10).required(),
//         maxAge:Joi.number().min(15).max(50).required()
//     })
// }
