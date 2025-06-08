import { User } from "../models/user.model.js";
 export const  createuser = async ({firstname,lastname ,email,password})=>{
if(!firstname||!lastname||!email){
    throw new Error('all field are required');
    
    
}
const user = await User.create({
   fullname : {firstname,lastname},email,password
})
console.log(user);
return user;
 }

 export const generateaccesstokenandrefreshtoken = async (user)=>{
const accesstoken = await user.generateaccesstoken();
const refreshtoken = await user.generaterefreshtoken ();
user.refreshtoken=refreshtoken;
  await user.save({validateBeforeSave:false})

return {accesstoken,refreshtoken};
 }
