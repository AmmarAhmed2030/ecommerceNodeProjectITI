
let sides=['body','params','query'];
export const validation = (schema)=>{
    return (req,res,next)=>{
        let errors = [];
        let foundedData=[];
        sides.forEach((ele)=>{
            if((req[ele])&&(schema[ele])){
                let checkValidation = schema[ele].validate(req[ele],{abortEarly:false});
                if(checkValidation && checkValidation.error){
                    errors.push(checkValidation.error.details);
            }   
        }
        })
        if(errors.length){
            res.json({message:"validation error",err:errors})
        }else{
            next();
        }
    }
}