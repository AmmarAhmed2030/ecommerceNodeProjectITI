

import mongoose from 'mongoose';
let userSchema= new mongoose.Schema({
    userName:String,
    age:Number,
    email:String,
    password:String,
    gender:String,
    role:String,
    city:String,
    country:String,
    street:String,
    isLogged:{
      type:Boolean,
      default:false
    },
    isVerified:{
      type:Boolean,
      default:false
    },
    isActive:{
      type:Boolean,
      default:true
    }
    
},{timestamps:true});
  const  userModel= mongoose.model('User',userSchema);
  export default userModel;