import mongoose from "mongoose";
 import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const captainschema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            require:true,
            minlength:[3,"firstname must be at least 3 character long"]
        },
        lastname:{
            type:String,
            require:true,
 minlength:[3,"lastname must be at least 3 character long"]
        
        }
    },
    email:{
        type:String,
        require:true,
        unique:true,
        match:[/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password:{
        type:String,
        require:true,
        minlength:[6,"password must be at least 6 character long"]
    },
    socketId:{
        type:String,
        require:true,
        default:null
    },
    status:{
        type
: String,
        enum: ["active","inactive"],
        default: "active"
    },
vehicle:{
   color:{
        type:String,
        require:true,
        minlength:[3,"color must be at least 3 character long"]
    },
    platenumber:{
        type:String,
        require:true,
        unique:true,
        minlength:[3,"vehicle number must be at least 3 character long"]
    },
    capacity:{
        type:String,
        require:true,
        min:[1,"vehicle model must be at least 3 character long"]
    },
    vehicletype:{
        type:String,
        require:true,
        enum:["car","bike","auto"],
        default:"car"
    }


},
location:{
    llat:{
        type:Number,
        require:true
    },
    lng:{
        type:Number,
        require:true
    }

}
},{
    timestamps:true
})
captainschema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

    return token;
}
captainschema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
captainschema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const Captain = mongoose.model("Captain",captainschema);