import mongoose from 'mongoose';
let couponSchema= new mongoose.Schema({
    couponCode:String,
    value:Number,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    deletedBy:{
        type:String,
     
        default:"",
        ref:"User"
    },
    updatedBy:{
        type:String,
      default:"",
        ref:"User"
    },
    expireIn:{
        type:Date
    },
    deleted: {
        type: Boolean,
        default: false
    }
   
   
  
    
},{timestamps:true});
  const  couponModel= mongoose.model('Coupon',couponSchema);
  export default couponModel;