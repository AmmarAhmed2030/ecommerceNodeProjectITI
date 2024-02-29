import mongoose from 'mongoose';
let categorySchema= new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
       },
 
 
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    cloudinary_id:String,
    cloudinary_url:String
   
  
    
},{timestamps:true});
  const  categoryModel= mongoose.model('Category',categorySchema);
  export default categoryModel;