import cartModel from "../../../../db/models/cart.model.js";
import orderModel from "../../../../db/models/order.model.js";
import userModel from "../../../../db/models/user.model.js";

export const makeOrder =  async (req,res)=>{

    let {shippingAddress1,shippingAddress2,city,street,zip,phone} = req.body;
    let foundUser = await userModel.findById(req.Id);
    if(!foundUser) return res.json({message:"you need to register first"});

    let cartId = req.params.cartId;
    let foundCart = await cartModel.findById(cartId);
    if(!foundCart) return res.json({message:"Cart Not Found"});
    let priceAfterDiscount = foundCart.priceAfterDiscount;

    let addedOrder= new orderModel({
          
        cartId,
        totalPrice:priceAfterDiscount,
        shippingAddress1,
        shippingAddress2,
        city,
        street,
        zip,
        phone,
        user:req.Id
       
    });
    addedOrder.save()
    .then(order => {
      console.log('Order added:', order);
      res.json({message:"added Order",order})
    })
    .catch(err => {
      console.error('Error making order:', err.message);
    });
}

