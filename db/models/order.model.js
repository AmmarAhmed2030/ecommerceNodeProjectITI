
import mongoose from 'mongoose';

let orderSchema= new mongoose.Schema({
    cartId:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Cart",
           
        }
    ,
    shippingAddress1:{
        type:String,
       

    },
    shippingAddress2:{
        type:String,
    },
    city:{
        type:String,
    },
    street:{
        type:String,
      
    },
    dateOrdered:{
       type:Date,
       default:Date.now 
    },
    zip:{
        type:String,
       
    },
    phone:{
        type:String,
       
    },
    totalPrice:{
        type:Number,
    },
    status:{
        type:String,
        
        default:"pending"
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },



},{timestamps:true})
orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
orderSchema.set('toJSON',{
    virtuals:true,
})
const  orderModel= mongoose.model('Order',orderSchema);
  export default orderModel;