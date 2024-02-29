import mongoose from 'mongoose';
import productModel from './product.model.js';

let cartSchema= new mongoose.Schema({
   userId:{
    type:mongoose.Types.ObjectId,
    ref:"User"
    },
   
    addedProducts:[
    {
        foundProduct:{
            productName:{type:String},
            slug:String,
            finalPrice:{type:Number},
            cloudinary_id:String,
            cloudinary_url:String,
           priceAfterDiscount:Number,
            categoryId:{
                type:mongoose.Types.ObjectId,
                ref:"Category",
               
            },
            stock:Number,
            createdBy:{
              type:mongoose.Types.ObjectId,
              ref:"User",
             
            },
            discount:{
              type:Number,
              default:0
            },
            isCouponApplied:{
              type:Boolean,
              default:false
            }
        },
        quantity:{
            type:Number,
            default:1,
            
        }
    }
    ],
    finalPrice:{
        type:Number,
        default:0
    },

    priceAfterDiscount:{
        type:Number,
        default:0
    }
   
  
    
},{timestamps:true});
  const  cartModel= mongoose.model('Cart',cartSchema);
  export default cartModel;