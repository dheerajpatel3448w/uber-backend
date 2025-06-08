import { Blacklist } from "../models/blacklist.model.js";
import { User } from "../models/user.model.js"

import jwt from "jsonwebtoken";
export const verifyjwt = async (req,res,next) => {
const token  = req.cookies?.accessToken || req.headers?.authorization?.replace("Bearer  ","");
console.log(token);
const black = await Blacklist.findOne({token});
if(black){
    return res.status(401).json({message:"unauthorize"});
}
if(!token){
    return res.status(400).json("user token not exist")
}
const verify =  jwt.verify(token,process.env.JWT_SECRET);
if(!verify){
    return res.status(400).json("user not verify 2");
}
const user = await User.findById(verify._id);
if(!user){
    return res.status(400).json("user not verify");
}
req.user = user;

next();  
}
