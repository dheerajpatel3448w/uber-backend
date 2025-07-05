
import { confirmride2, createride } from "../service/ride.service.js"
import { validationResult } from "express-validator"
import { getfare } from "../service/ride.service.js"
import { sendmessagetosocket } from "../socket.js"
import { getcaptaininradius, getlocation } from "../service/maps.service.js"
import { Ride } from "../models/ride.model.js"

export const createride2 = async(req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
        }
        const { pickup,destination,vehicletype} = req.body;
        console.log(req.body);
        const userId = req.user.id;
        const ride = await createride({userId,pickup,destination,vehicletype});
        if(!ride){
            return res.status(400).json({ message: "ride not created" })
        }
        const location = await getlocation(pickup);
        console.log(location);
        const captainradius = await getcaptaininradius(location.lat,location.lng,2000);
        console.log(captainradius);
        ride.otp="";

const ridewith = await Ride.findById(ride._id).populate('user');
        captainradius.map((Captain1)=>{
sendmessagetosocket(Captain1.socketId,{
    event:'new-ride',
    data: ridewith
})

        })

        return  res.status(201).json({ message: "ride created successfully" ,ride,success:true})
  
}
export const getfare2 = async(req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
        }

    const { pickup,destination} = req.query;
    console.log(pickup,destination);
    const data = await getfare(pickup,destination);
    console.log(data);
if(!data){
    return res.status(400).json({ message: "fare not found" })
}
return res.status(200).json({ message: "fare found successfully",data,success:true})
  
}
export const confirmride = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {rideId}= req.body;
    console.log(rideId);
    const ride = await confirmride2(rideId,req.user._id);
    console.log(ride.user.socketId);
    sendmessagetosocket(ride.user.socketId,{
        event:'ride-confirmed',
        data: ride
    })


  return res.status(200).json({
    message: "ride confirmed successfully",
    ride,success:true
  })
}
export const confirmstartride = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
        }
        const {rideId,otp}= req.body;
        console.log(rideId,otp);
        const ride = await Ride.findById(rideId).select("+otp");

        const verify = await ride.compareotp(otp);
        console.log(verify)
        if(!verify){
            return res.status(400).json({ message: "invalid otp" ,success:false})
        }
       const ride2 = await Ride.findByIdAndUpdate(rideId,{
            status:"ongoing"

        },{
            new : true
        }).populate('user').populate('captain')

        sendmessagetosocket(ride2.user.socketId,{
            event:'ride-start',
            data:ride2
        })
        return  res.status(200).json({
            message: "ride started successfully",
            ride2,success:true
        
        })
  
}

export const endride = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
        }
        const {rideId}= req.body;
        console.log('end ride')
        const ride = await Ride.findById(rideId);
        if(!ride){
            return res.status(400).json({ message: "ride not found" ,success:false})
        }
        const ride2 = await Ride.findOneAndUpdate({_id:rideId,captain:req.user._id},{
            status:"completed",
        },{
            new : true
        }).populate('user').populate('captain');
        if(!ride2){
            return res.status(400).json({ message: "ride not found" ,success:false})
        }
        sendmessagetosocket(ride2.user.socketId,{
            event:'ride-end',
            data:ride2
        });
        return  res.status(200).json({
            message: "ride ended successfully",
            ride2,success:true
        })

  
}
