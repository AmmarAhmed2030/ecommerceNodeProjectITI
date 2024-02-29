import categoryModel from "../../../../db/models/category.model.js";
import productModel from "../../../../db/models/product.model.js";
import userModel from "../../../../db/models/user.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import upload from "../../../utils/multer.js";

//create category if you are logged in user
export const addCategory =async(req,res)=>{
    let foundUser = await userModel.findById(req.Id);
    if(!foundUser) return res.json({message:"you need to register first"});
  
    try{
        const result =  await cloudinary.uploader.upload(req.file.path,{
          folder:"categories"
        });
  

  
        let addedCategory = await categoryModel.insertMany({
            categoryName:req.body.categoryName,        
            cloudinary_id:result.public_id,
            cloudinary_url:result.secure_url,
            createdBy:req.Id
        })
        res.json(addedCategory);
    }catch(err){
  
        console.log(err)
    }
  }
//delete category with id if you are admin or if you created this category
  export const deleteCategory = async(req,res)=>{

    try{
    console.log(req.Id,req.role);
    let foundUser = await userModel.findById(req.Id);
    if(!foundUser) return res.json({message:"you need to register first"});
    let foundCategory = await categoryModel.findById(req.params.categoryId);
    if(!foundCategory) return res.json({message:"Category not found"});
    if(req.Id!=foundCategory.createdBy) {
  
      if(foundUser.role!='admin'){
  
        return res.json({message:"you are not allowed to delete this product"});
      }
  
    }
   
  
    await cloudinary.uploader.destroy(foundCategory.cloudinary_id);
    await categoryModel.findByIdAndDelete(foundCategory._id);
  
    res.json({message:"Category deleted",foundCategory});
    }catch(err){
      console.log(err)
    }
  
  }
//update category with id if you are admin or if you created this category
export const updateCategory = async(req,res)=>{

    try{
     // console.log(req.Id,req.role);
    let foundUser = await userModel.findById(req.Id);
    if(!foundUser) return res.json({message:"you need to register first"});
    let foundCategory = await categoryModel.findById(req.params.categoryId);
    if(!foundCategory) return res.json({message:"Category not found"});
    if(req.Id!=foundCategory.createdBy) {
  
      if(foundUser.role!='admin'){
  
        return res.json({message:"you are not allowed to update this product"});
      }
  
    }
   
  
    await cloudinary.uploader.destroy(foundCategory.cloudinary_id);
    const result =  await cloudinary.uploader.upload(req.file.path);
    const data = {
      categoryName:req.body.categoryName,
   
      cloudinary_id:result.public_id,
      cloudinary_url:result.secure_url,
     
      createdBy:req.Id
    }
    let updatedCategory = await categoryModel.findByIdAndUpdate(foundCategory._id,data,{new:true})
  
    res.json({message:"Category updated",updatedCategory});
    }catch(err){
      console.log(err)
    }
  
  }
// Get All Categories  
export const getAllCategories = async(req,res)=>{
    const foundCategories= await categoryModel.find({});
    if(!foundCategories) return res.json({message:"Sorry not found categories"});
    res.json({message:"There ara all categories",foundCategories});

}  
//Get Specific Category with category id 
export const getCategory = async(req,res)=>{
    const catId = req.params.categoryId;
    let foundCategory= await categoryModel.findById(catId);
    if(!foundCategory) return res.json({message:"Category Not Found"});
    res.json({message:"Found Category is : ",foundCategory});
}