import  jwt  from "jsonwebtoken";
export const auth =(req,res,next)=>{
   
    let {authorization} = req.headers;
    let token = authorization.split(" ")[1];
  
    jwt.verify(token,'ITI',(err,decoded)=>{
        if(err) return res.json({message:"Error",err});
        
        req.Id=decoded.id;
        req.role=decoded.role;
        next();
    })
}
