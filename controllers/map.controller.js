import { validationResult } from "express-validator";
import { getlocation } from "../service/maps.service.js"
import { ValidationHalt } from "express-validator/lib/base.js";
import { getdistancetime2 } from "../service/maps.service.js";
import { getautosuggesstion2 } from "../service/maps.service.js";
export const getcoordinates = async(req,res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
        
    }
  const {address} =req.query;
  const coordinate = await getlocation(address);
  if(!coordinate){
    res.status(400).json({message:"error"});
  }
  res.status(200).json(coordinate);
}


export const getdistancetime = async(req,res) => {
    const gh = validationResult(req);
    if(!gh.isEmpty()){
        return res.status(400).json({message:"error"});
    }
  const {origin , destination} = req.query;
  const result = await getdistancetime2(origin,destination);
  console.log(result);
  if(!result){
    res.status(400).json({message:"no result"})
  }
return res.status(200).json({message:"success" ,result ,success:true});

}


export const getautosuggestion = async(req,res) => {
   const gh = validationResult(req);
    if(!gh.isEmpty()){
        return res.status(400).json({message:"error"});
    }
const {input}= req.query;
console.log(input);
  const result = await  getautosuggesstion2(input)
  console.log(result);
  if(!result){
    res.status(400).json({message:"no result"})
    
  }
return res.status(200).json({message:"success" ,result ,success:true});
  
}
