import { Ride } from "../models/ride.model.js";
 import { getdistancetime2 } from "./maps.service.js";
import crypto from "crypto";

export const getfare = async(pickup,destination) => {
if(!pickup||!destination){
    throw new Error("Invalid pickup or destination");
}

    const distanceData = await getdistancetime2(pickup, destination);

    // distanceData.distance.value is in meters
    const distanceInKm = distanceData.distance.value / 1000;

    // Example base fares and per km rates
    const rates = {
        bike: { base: 20, perKm: 8 },
        auto: { base: 30, perKm: 12 },
        car:  { base: 50, perKm: 18 }
    };

    const fare = {
        bike: Math.round(rates.bike.base + rates.bike.perKm * distanceInKm),
        auto: Math.round(rates.auto.base + rates.auto.perKm * distanceInKm),
        car:  Math.round(rates.car.base  + rates.car.perKm  * distanceInKm)
    };

    return  {
        fare,
        distance: distanceData.distance.value,
        duration: distanceData.duration.value
    };
};
export const createride = async({userId,pickup,destination,vehicletype}) =>{

    if (!userId || !pickup||!destination||!vehicletype){
        throw new Error("Invalid user, pickup, destination or vehicle type");
    }
    const fare =  await getfare(pickup,destination);

    const ride = await Ride.create({
        user:userId,
        pickup,
        destination,
        fare :fare.fare[vehicletype],
        distance:fare.distance,
        duration:fare.duration,
        otp:getotp(6)

    })
return ride;
}


export const getotp = (num) => {
    // Generates a numeric OTP of length `num` using crypto for randomness
    if (!num || isNaN(num) || num < 1) {
        throw new Error("Invalid OTP length");
    }
    const min = Math.pow(10, num - 1);
    const max = Math.pow(10, num) - 1;
    const otp = crypto.randomInt(min, max + 1);
    return otp.toString();
};

export const confirmride2 = async (rideid,id) => {
    if (!rideid) {
        throw new Error("Invalid ride id");

        }
        const ride = await Ride.findByIdAndUpdate(rideid,{
            status:"accepted",
            captain:id
        },{
            new:true
        }).populate('captain').populate('user').select('+otp');
        console.log(ride)

        return ride;



  
}
