import couponModel from "../../../../db/models/coupon.model.js";
import productModel from '../../../../db/models/product.model.js'
import userModel from "../../../../db/models/user.model.js";
import { v4 as uuidv4 } from 'uuid';
export const addCoupon = async(req,res)=>{
    let userId = req.Id;
    let {value,expireIn}= req.body;
    
    const currentDate = new Date();
    if (currentDate> new Date(expireIn)) return res.json({message:"The current date exceeds the expiration date."});
    let foundUser = await userModel.findById(req.Id);
    if(!foundUser) return res.json({message:"you need to register first"});
    const addedCoupon = await couponModel.insertMany({
        couponCode:uuidv4(),
        value,
        expireIn,
        createdBy:userId,
        deletedBy:"",
        updatedBy:""
    });
    res.json({message:"coupon added",addedCoupon});
  
}

export const updateCoupon= async(req,res)=>{
    let userId =  req.Id;
    let role = req.role;
    let code = req.params.code;

    let {value,expireIn}= req.body;
    const currentDate = new Date();
    if (currentDate> new Date(expireIn)) return res.json({message:"The current date exceeds the expiration date."});
    let foundCoupon= await couponModel.find({couponCode:code});
    if(!foundCoupon) return res.json({message:"Coupon not found"});
    if(role!=='admin'&&userId!==foundCoupon.createdBy) return res.json({message:"you are not allowed to update this coupon"});
    let updatedCoupon = await couponModel.findByIdAndUpdate(foundCoupon[0]._id,{value,updatedBy:userId,expireIn},{new:true});
    res.json({message:"coupon updated successfully",updatedCoupon});
}

export const deleteCoupon = async(req,res)=>{


    let userId =  req.Id;
    let role = req.role;
    let code= req.params.code;
    let foundCoupon= await couponModel.find({couponCode:code});
    //console.log(foundCoupon);
    if(!foundCoupon) return res.json({message:"Coupon not found"});
    if(role!=='admin'&&userId!==foundCoupon.createdBy) return res.json({message:"you are not allowed to delete this coupon"});
    let deletedCoupon = await couponModel.findByIdAndUpdate(foundCoupon[0]._id,{deletedBy:userId,deleted:true},{new:true});
    res.json({message:"coupon deleted successfully",deletedCoupon});
}

export const getCoupons = async(req,res)=>{
    let coupons = await couponModel.find({deleted:false});
    if(!coupons) return res.json({message:"no coupons found"});
    res.json({message:"all coupons",coupons});
}
export const applyCouponOnProduct = async(req,res)=>{
    let {couponCode,productId}  = req.body;
    let foundCoupon = await couponModel.find({couponCode,deleted:false});
    if(!foundCoupon) return res.json({message:"coupon not found"});
    let foundProduct = await productModel.findById(productId);
    if(!foundProduct) return res.json({message:"product not found"});
    let updatedProduct=await productModel.findByIdAndUpdate(productId,{discout:foundCoupon[0].value,isCouponApplied:true,priceAfterDiscount:foundProduct.finalPrice*(1-foundCoupon[0].value/100),isAppliedCoupon:true},{new:true});
  
    res.json({message:"product after apply coupon on it ",updatedProduct});


}