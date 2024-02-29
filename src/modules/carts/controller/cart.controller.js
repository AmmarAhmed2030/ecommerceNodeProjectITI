import couponModel from "../../../../db/models/coupon.model.js";
import productModel from "../../../../db/models/product.model.js";
import cartModel from "../../../../db/models/cart.model.js"
import userModel from "../../../../db/models/user.model.js";

const fetchProduct = async (prdId)=>{
    let foundProduct= await productModel.findById(prdId);
    return foundProduct;
}
export const createCart = async(req,res)=>{
    let userId = req.Id;
    const foundUser = await userModel.findById(userId);
    if(!foundUser) return res.json({message:"You need to register first"});
    let foundCart=await cartModel.find({userId});
    if(foundCart) return res.json({message:"Sorry you can not create more than one cart for one user"}) 
    let addedProducts = req.body.addedProducts;
   
    let productObjectsFound = await Promise.all(addedProducts.map(async(product)=>{
        //console.log(product);
        let foundProduct =  await fetchProduct(product.productId);
        //console.log(foundProduct);
        if(!foundProduct) return res.json({message:'product not found'})
        let quantity = product.quantity;
        if(foundProduct.stock<quantity) return res.json({message:"this quantity exceeds the stock our stock is : ",stock : foundProduct.stock});
       // console.log(foundProduct,quantity)
        return {foundProduct,quantity}
    }))
    
   // console.log(productObjectsFound);
   let totalPrice=0;
   let totalPriceAfterDiscount=0;
   
    let newArray = productObjectsFound.map((obj)=>{
        
       totalPrice += (obj.foundProduct.finalPrice)*obj.quantity;
       totalPriceAfterDiscount+=(obj.foundProduct.priceAfterDiscount)*obj.quantity;
        
        return {foundProduct:obj.foundProduct,quantity:obj.quantity}
    
    });
    
  
  
    const addedCart = new cartModel({
        userId,
        addedProducts:productObjectsFound,
        finalPrice:totalPrice,
        priceAfterDiscount:totalPriceAfterDiscount

    });
    addedCart.save()
    .then(cart => {
        console.log('Cart added:', cart);
        res.json({message:"added cart",cart})
    })
    .catch(err => {
        console.error('Error creating cart:', err.message);
    });
    


}
export const updateCart= async(req,res)=>{
    
    
    let cartId = req.params.cartId;
    let foundCart= await cartModel.findById(cartId);
    if(!foundCart) return res.json({message:"not found cart"});
    if((req.role!='admin')&&(req.Id!=foundCart.userId))  return res.json({message:"You are not allowed to update this product"});
    let {addedProducts}=req.body;
    let productObjectsFound = await Promise.all(addedProducts.map(async(product)=>{
        //console.log(product);
        let foundProduct =  await fetchProduct(product.productId);
        //console.log(foundProduct);
        if(!foundProduct) return res.json({message:'product not found'})
        let quantity = product.quantity;
        if(foundProduct.stock<quantity) return res.json({message:"this quantity exceeds the stock our stock is : ",stock : foundProduct.stock});
       // console.log(foundProduct,quantity)
        return {foundProduct,quantity}
        }))
        
        // console.log(productObjectsFound);
        let totalPrice=0;
        let totalPriceAfterDiscount=0;
    
        let newArray = productObjectsFound.map((obj)=>{
            
        totalPrice += (obj.foundProduct.finalPrice)*obj.quantity;
        totalPriceAfterDiscount+=(obj.foundProduct.priceAfterDiscount)*obj.quantity;
            
            return {foundProduct:obj.foundProduct,quantity:obj.quantity}
        
        });
    

    const updatedCart= await cartModel.findByIdAndUpdate(cartId,{addedProducts:productObjectsFound,
        finalPrice:totalPrice,
        priceAfterDiscount:totalPriceAfterDiscount});
  
    res.json({message:"cart Updated Successfully",updateCart});


}
export const applyCouponOnCart= async(req,res)=>{
    
    let cartId = req.params.cartId;
    let couponCode  =  req.params.code;
    const foundCart= await cartModel.findById(cartId);
    
    const foundCoupon = await couponModel.find({couponCode});
    if(!foundCoupon) return res.json({message:"coupon not found"});
    let discount =  foundCoupon[0].value; 
    let addedProducts = foundCart.addedProducts;
    //console.log(addedProducts);


    let productObjectsFound = await Promise.all(addedProducts.map(async(product)=>{

       
       let foundProduct= product.foundProduct;
        let quantity = product.quantity;
        if(product.foundProduct.stock<quantity) return res.json({message:"this quantity exceeds the stock our stock is : ",stock :product.foundProduct.stock});
        return {foundProduct,quantity}
        }))
     
        let totalPrice=0;
        let totalPriceAfterDiscount=0;
    
        let newArray = productObjectsFound.map((obj)=>{
               let foundProduct = obj.foundProduct;
                totalPrice += foundProduct.finalPrice*obj.quantity;
                totalPriceAfterDiscount +=(foundProduct.finalPrice*obj.quantity)*(1-discount/100);
          
          
            return {foundProduct:obj.foundProduct,quantity:obj.quantity}
        
        });



    const updatedCart= await cartModel.findByIdAndUpdate(cartId,{addedProducts:productObjectsFound,finalPrice:totalPrice,priceAfterDiscount:totalPriceAfterDiscount},{new:true});
  
    res.json({message:"coupon applied Successfully",updatedCart});


}