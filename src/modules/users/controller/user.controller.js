import userModel from "../../../../db/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendOurEmail from "../../../services/sendEmail.js";
import userRoutes from "../user.routes.js";
import crypto from "crypto";

// Add User
// userName , password , Cpassword , email
export const addUser = async (req, res) => {
  let {
    userName,
    password,
    CPassword,
    email,
    age,
    country,
    city,
    street,
    role,
    gender,
  } = req.body;
  let foundedUser = await userModel.findOne({ email: req.body.email });
  if (foundedUser)
    return res.json({
      message: "try another email this email is already registered",
    });
  if (password !== CPassword)
    return res.json({ message: "password and CPassword should be match " });

  let hashedPassword = bcrypt.hashSync(password, 10);
  let addedUser = await userModel.insertMany({
    userName,
    email,
    age,
    password: hashedPassword,
    country,
    city,
    street,
    role,
    gender,
  });
  let token = jwt.sign(
    { id: addedUser[0]._id, role: addedUser.role },
    "NewUser"
  );
  let url = `http://localhost:3000/auth/login`;
  sendOurEmail(email, url);
  const insertedUser = addedUser[0];
  return res.json({ message: "Added", insertedUser });
};

export const verifyAccount = (req, res) => {
  let { token } = req.params;
  jwt.verify(token, "NewUser", async (err, decoded) => {
    let foundUser = await userModel.findById(decoded.id);
    if (!foundUser) return res.json({ message: "invalid user" });
    let updatedUser = await userModel.findByIdAndUpdate(
      decoded.id,
      { isVerified: true },
      { new: true }
    );
    res.json({ message: "hello from verify", updatedUser });
  });
};
// signIn
export const signIn = async (req, res) => {
  let { email, password } = req.body;
  let foundUser = await userModel.findOne({ email });
  //console.log(foundUser);
  if (!foundUser) {
    return res.json({ message: "You need to register first" });
  } else {
    if (!foundUser.isVerified)
      return res.json({ message: "please verify your account first" });
    let matchedPassword = bcrypt.compareSync(password, foundUser.password);
    if (matchedPassword) {
      let token = jwt.sign({ id: foundUser._id, role: foundUser.role }, "ITI");
      let updatedUser = await userModel.findByIdAndUpdate(
        foundUser._id,
        { isLogged: true },
        { new: true }
      );
      // localStorage.setItem('token',token);
      res.json({ message: "welcome", token, updateUser });
    } else {
      res.json({ message: "invalid user" });
    }
  }
};
//Deactivate user
export const deactivateUser = async (req, res) => {
  let { id } = req.params;
  let foundUser = await userModel.findById(id);
  if (!foundUser) return res.json({ message: "user not found" });
  let deactivatedUser = await userModel.findByIdAndUpdate(
    foundUser._id,
    { isActive: false },
    { new: true }
  );
  return res.json({
    message: "user is deactivated successfully ",
    deactivatedUser,
  });
};

//activate user

export const activateUser = async (req, res) => {
  let { id } = req.params;
  let foundUser = await userModel.findById(id);
  if (!foundUser) return res.json({ message: "user not found" });

  let activatedUser = await userModel.findByIdAndUpdate(
    foundUser._id,
    { isActive: true },
    { new: true }
  );
  return res.json({
    message: "user is activated successfully ",
    activatedUser,
  });
};
//forget password
export const forgetPassword = async (req, res) => {
  let { email } = req.body;
  let foundUser = await userModel.findOne({ email });
  if (!foundUser) return res.json({ message: "you need to register first " });
  const secret = process.env.TOKEN_SECRET + foundUser.password;

  const token = jwt.sign(
    { email: foundUser.email, id: foundUser._id },
    secret,
    { expiresIn: "5m" }
  );
  let url = `http://localhost:3000/user/resetPassword/${foundUser._id}/${token}`;
  sendOurEmail(foundUser.email, url);
};

export const resetPass = async (req, res) => {
  let { id, token } = req.params;
  let foundUser = await userModel.findById(id);
  if (!foundUser)
    return res.json({ message: " User Not Found you need to register first" });
  const secret = process.env.TOKEN_SECRET + foundUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email });
  } catch (err) {
    res.send("Not verified");
  }
};
//reset password
export const resetPassword = async (req, res) => {
  let { id, token } = req.params;
  let { oldPassword, password, CPassword } = req.body;
  let foundUser = await userModel.findById(id);
  if (!foundUser)
    return res.json({ message: " User Not Found you need to register first" });
  const secret = process.env.TOKEN_SECRET + foundUser.password;
  try {
    const verify = jwt.verify(token, secret);
    let matchedPassword = bcrypt.compareSync(oldPassword, foundUser.password);
    if (!matchedPassword)
      return res.json({ message: "your old password is not correct" });
    let updatedUser = await userModel.findByIdAndUpdate(
      foundUser._id,
      { password: bcrypt.hashSync(password, 10), CPassword: CPassword },
      { new: true }
    );
    res.json({ message: "your password is updated", updateUser });
  } catch (err) {
    res.send("Not verified");
  }
};

<<<<<<< HEAD
=======
      let {email}= req.body;
      let foundUser = await userModel.findOne({email});
      if(!foundUser) return res.json({message:"you need to register first "});
      const secret = process.env.TOKEN_SECRET + foundUser.password;

      const token = jwt.sign({email:foundUser.email,id:foundUser._id},secret,{expiresIn:'5m'});
      let url = `http://localhost:3000/user/resetPassword/${foundUser._id}/${token}`;
      sendOurEmail(foundUser.email,url);
  

  }


  export const resetPass =async(req,res)=>{
    let {id,token}= req.params;
    let foundUser = await userModel.findById(id);
    if(!foundUser) return res.json({message:" User Not Found you need to register first"});
    const secret = process.env.TOKEN_SECRET + foundUser.password;
    try{
      const verify = jwt.verify(token,secret);
      res.json({message:"verified and your email is ",email:verify.email})
    }catch(err){
      res.send("Not verified")
    }
    
  }
  //reset password
  export const resetPassword =async (req,res)=>{

    let {id,token}= req.params;
    let {oldPassword,password,CPassword} = req.body;
    let foundUser = await userModel.findById(id);
    if(!foundUser) return res.json({message:" User Not Found you need to register first"});
    const secret = process.env.TOKEN_SECRET + foundUser.password;
    try{
      const verify = jwt.verify(token,secret);
      let matchedPassword= bcrypt.compareSync(oldPassword,foundUser.password);
      if(!matchedPassword)return res.json({message:"your old password is not correct"});
      let updatedUser= await userModel.findByIdAndUpdate(foundUser._id,{password:bcrypt.hashSync(password,10) ,CPassword:CPassword},{new:true})
      res.json({message:"your password is updated",updateUser})
    }catch(err){
      res.send("Not verified")
    }
     
      
  
      
      
     
       
    }
     
    
  
>>>>>>> 85eab177cfffccc45e6e976acbb5c970a703ca14
// Update user
export const updateUser = async (req, res) => {
  let foundAdmin = await userModel.findById(req.Id);
  if (!foundAdmin) return res.json({ message: "You need to register First" });
  if (req.role !== "admin")
    return res.json({
      message: "you are not authorized to update on users data",
    });
  let { userId } = req.params;
  let { userName, age, country, city, street, gender } = req.body;
  let foundUser = await userModel.findById(userId);
  if (!foundUser) return res.json({ message: "user not found" });
  let updatedUser = await userModel.findByIdAndUpdate(
    foundUser._id,
    { userName, age, country, city, street, gender },
    { new: true }
  );
  res.json({ message: "updated successfully", updatedUser });
};
// delete User
export const deleteUser = async (req, res) => {
  // Find the user by ID and remove it
  let foundedUser = await userModel.findByIdAndDelete(req.params.id);
  if (foundedUser) {
    return res.json({ message: "deleted user", foundedUser });
  } else {
    res.json({ message: "User not founded" });
  }
};
// search user by id
export const searchUserById = async (req, res) => {
  const userId = req.params.id;
  const foundedUser = await userModel.findOne({ _id: userId });
  if (foundedUser) {
    res.json({ message: "founded one is ", foundedUser });
  } else {
    res.send("User Not found");
  }
};
// get all users sorted alphabetically
export const getAllUsersSorted = async (req, res) => {
  const sortedUsers = await userModel.find({}, null, { sort: { name: 1 } });
  res.json({ message: "sorted users", sortedUsers });
};

// get all users
export const getAllUsers = async (req, res) => {
  const allUsers = await userModel.find();
  res.json({ message: "done", allUsers });
};
// search user using age and startwith name
export const searchByNameAge = async (req, res) => {
  let startWith = req.params.startWith;
  let maxAge = req.params.maxAge;
  const foundUsers = await userModel.find({
    userName: { $regex: "^" + startWith, $options: "i" },
    age: { $lt: maxAge },
  });
  if (!foundUsers) return res.json({ message: "No Users Found" });
  res.json({ message: "found users are : ", foundUsers });
};

export const searchByAge = async (req, res) => {
  let { minAge, maxAge } = req.params;

  if (!minAge || !maxAge) {
    return res
      .status(400)
      .json({ error: "Minimum and maximum age are required" });
  }

  // Find users whose age falls within the specified range
  const foundUsers = await userModel.find({
    age: { $gte: parseInt(minAge), $lte: parseInt(maxAge) },
  });
  if (!foundUsers) return res.json({ message: "No Users Found" });
  res.json({ message: "found users are : ", foundUsers });
};
