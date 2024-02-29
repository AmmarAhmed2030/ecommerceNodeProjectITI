import mongoose from 'mongoose';
let orderItemSchema= new mongoose.Schema({
    quantity:{
        type:Number,
        equired:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }

},{timestamps:true})
const  orderItemModel= mongoose.model('OrderItem',orderSchema);
  export default orderModel;