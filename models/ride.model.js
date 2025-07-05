import mongoose from "mongoose";
 
const rideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true,
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
       
    },
    pickup:{
        type:String,
        require:true

    },
    destination:{
        type:String,
        require:true

    },
    fare:{
        type:Number,
        require:true

    },
    status:{
        type:String,
        
        enum: ['pending', 'accepted', 'cancelled', "ongoing" , 'completed' ],
        default: 'pending'
    },
    distance:{
        type:Number,
        

    },
    duration:{
        type:Number,
        
    },
    paymentId :{
        type:String,
    },
    orderId:{
        type:String,
    },
    signature:{
        type:String,
    },
    otp:{
        type:String,
        select:false,
        require:true
    }


},{
    timestamps:true

})
rideSchema.methods.compareotp=async function(otp){
     console.log(this.otp,otp);
return this.otp===otp;
}

export const Ride= mongoose.model('Ride', rideSchema);
