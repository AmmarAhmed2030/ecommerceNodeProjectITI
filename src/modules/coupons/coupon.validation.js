import Joi from 'joi';
export const addCouponSchema = {
    body:Joi.object().required().keys({
   
        expireIn:Joi.date().required(),
        value:Joi.number().min(0).max(100).required()
        
        
    })
}
export const updateCouponSchema = {
    body:Joi.object().required().keys({
   
        expireIn:Joi.date().required(),
        value:Joi.number().min(0).max(100).required(), 
    }),
    params:Joi.object().required().keys({
   
      
        code:Joi.string().required().guid({
            version:["uuidv4"]
        })
        
    })
    
}
export const deleteCouponSchema = {
    params:Joi.object().required().keys({
   
      
        code:Joi.string().required().guid({
            version:["uuidv4"]
        })
        
    })
}
export const applyCouponOnProductSchema = {
   
    body:Joi.object().required().keys({
        couponCode:Joi.string().required().guid({
            version:["uuidv4"]
        }),

        productId:Joi.string().hex().min(24).max(24)
        
        
    })
}