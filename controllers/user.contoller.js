
import { User } from "../models/user.model.js";
import { createuser ,generateaccesstokenandrefreshtoken } from "../service/user.service.js";
import { validationResult } from "express-validator";

export const registerUser = async (req,res,next)=>{
    const errrors = validationResult(req);
    if(!errrors.isEmpty()){
        return res.status(400).json(errrors);
    }
const {fullname,email,password} = req.body;
const {firstname,lastname} = fullname;
 console.log(req.body,firstname);
    const userexist = await User.findOne({ email });
    if(userexist){
      return res.status(400).json({
        message: "User already exists"
      })
    }
const user = await createuser({firstname,lastname,email,password});
if(!user){
    throw new Error("user not created");
}
const token = await generateaccesstokenandrefreshtoken(user);
if(!token){
    throw new Error("token not generated");
}
return res.status(200).json({
    user:user,
    token:token,
    message: "User registered successfully",
    success:true
})
}
export const loginUser = async(req,res) => {
      const error = validationResult(req);
     if(!error.isEmpty()){
        return req.status(400).json(" require all field");
     }
    const {email,password}= req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json("user does not exist ");
    }

    const verify = user.comparepassword(password);
    if(!verify){
        return res.status(400).status("username and password are not match");
    }
    const {accesstoken,refreshtoken} = await generateaccesstokenandrefreshtoken(user);

 const options={
    httpOnly:true,
    secure:true,
}
return res.status(200).cookie('accessToken',accesstoken,options).cookie('refreshToken',refreshtoken,options).json({
    message: "Login successful",
    user:{
      user,accesstoken,refreshtoken 
    },
    success:true
})

  
}
