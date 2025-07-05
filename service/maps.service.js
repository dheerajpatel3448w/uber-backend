import axios from "axios";

import { Captain } from "../models/captain.model.js";

export const getlocation = async (address) => {
    try {
        const apiKey = process.env.GOOGLE_MAP_API;
        const encodedAddress = encodeURIComponent(address);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
        const response = await axios.get(url);
        
        if (response.data.status !== "OK") {
            throw new Error(`Geocode error: ${response.data.status}`);
        }
        
        const location = response.data.results[0].geometry.location; 
        console.log(location);// { lat: number, lng: number }
        return location;
    } catch (error) {
        console.error("Error fetching location:", error.message);
        throw error;
    }
};
export const getdistancetime2 =async (origin,destination) => {
    if(!origin||!destination){
        throw new error("origin dena badhve aur destination tera baap dega kya ");
    }
 
        const apiKey = process.env.GOOGLE_MAP_API;
    const encodedOrigin = encodeURIComponent(origin);
    const encodedDestination = encodeURIComponent(destination);
    
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodedOrigin}&destinations=${encodedDestination}&key=${apiKey}`;
        try {
            const response = await axios.get(url);
            
            console.log(response.data.rows[0].elements[0]);
            return response.data.rows[0].elements[0];

        } 
 catch (error) {
        console.error("Error fetching location:", error.message);
        throw error;
    }
}




export const getautosuggesstion2 = async(input) => {
    if(!input){
        throw new error("give input");
    }
    const input2 = encodeURIComponent(input);
    const apikey = process.env.GOOGLE_MAP_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input2}&key=${apikey}`
    try{
        const response = await axios.get(url);
   
        return response.data.predictions;
    }
    catch (err){
        throw err;
        

    }
  
}

export const getcaptaininradius = async(ltd,lng,radius) => {
    console.log(ltd,lng);
  const captain = await Captain.find({
    location: {
        $geoWithin:{
            $centerSphere:[[ltd,lng],radius/6371]
        }
    }
  })
  return captain;
}

