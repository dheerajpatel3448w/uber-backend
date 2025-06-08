import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullname:{
   firstname:{
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
        maxlength: [50, "First name must be at most 50 characters long"]
   },
   lastname:{
       type: String,
       required: true,
       minlength: [3, "Last name must be at least 3 characters long"],
       maxlength: [50, "Last name must be at most 50 characters long"]
   }
  },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
password:{
    type: String,
    required: true,
    
},
refreshtoken:{
type:String
},
soketId: {
    type: String,
    default:null
  
}
},{
    timestamps: true,
  })
  userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    try {
        
         this.password   = await bcrypt.hash(this.password, 10);
     
        next();
    } catch (error) {
        return next(error);
    }

  })
  userSchema.methods.comparepassword=async function (password) {
    return await bcrypt.compare(password,this.password);
    
  }
userSchema.methods.generateaccesstoken =async function(){
    const token = jwt.sign({
        id: this._id,
        email: this.email
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    }
)
return token;
}
userSchema.methods.generaterefreshtoken =async function(){
    const token = jwt.sign({
        id: this._id,
        email: this.email
    }, process.env.JWT_SECRET, {
        expiresIn: "10d"
    }
)
return token;
}
  export const User = mongoose.model("User", userSchema);