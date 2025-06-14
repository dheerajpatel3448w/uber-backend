import { Captain } from "../models/captain.model.js";

export const createCaptain = async (data) => {
    try {
        const { firstname, lastname, email, password, color, platenumber, capacity, vehicletype } = data;
        console.log(data);
        if (!firstname || !lastname || !email || !password || !color || !platenumber || !capacity || !vehicletype) {
            throw new Error("All fields are required");
        }
        const captain =Captain.create({
            fullname: { firstname, lastname },
            email,
            password,
            
            vehicle: { color, platenumber, capacity, vehicletype }
        });
       
       return captain;
    } catch (error) {
        throw new Error(error.message);
    }
}               