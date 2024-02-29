import Joi from 'joi';
export const makeOrderSchema ={
    body:Joi.object().required().keys({

        shippingAddress1:Joi.string().min(3).required(),
        shippingAddress2:Joi.string().min(3).required(),
        city:Joi.string().min(3).required(),
        street:Joi.string().min(3).required(),
        zip:Joi.string().min(3).required(),
        phone:Joi.string().regex(/^01[0125][0-9]{8}$/).message('Invalid Egyptian phone number format').required()
    }),
    params:Joi.object().required().keys({
        cartId:Joi.string().hex().min(24).max(24).required()
    })
}
