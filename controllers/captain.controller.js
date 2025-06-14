import { Captain } from "../models/captain.model.js";
import { createCaptain } from "../service/captain.service.js";
import { Blacklist } from "../models/blacklist.model.js";
export const registerCaptain = async (req, res) => {
    
        const {fullname, email, password, vehicle} = req.body;
        console.log(vehicle);
      
        const exist = await Captain.findOne({ email });
        if (exist) {    
            return res.status(400).json({ message: "Captain already exists" });
        }
        const {firstname, lastname} = fullname;
        const {color, platenumber, capacity, vehicletype} = vehicle;
        const captain = await createCaptain({
            firstname, lastname, email, password, color, platenumber, capacity, vehicletype
        });
        console.log(captain);

        return res.status(201).json({ message: "Captain registered successfully", captain });
    
}

export const loginCaptain = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    // Here you would typically check the email and password against the database
    const captain = await Captain.findOne({ email });

    if (!captain) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await captain.comparePassword (password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
     
    const  assesstoken =await  captain.generateAuthToken ();
const options={
  httpOnly:true,
  secure:true,

}
    return res.status(200).cookie('assesstoken',assesstoken,options).json({
        message: "Login successful",
        captain,
        assesstoken
    });
}
export const logoutCaptain = async (req, res) => {
    const token = req.cookies.assesstoken || req.headers?.authorization?.replace("Bearer  ", "");
    console.log("Received token:", token);
      await Blacklist.create({token});
    res.clearCookie('assesstoken');
    return res.status(200).json({ message: "Logout successful" });  
}
export const captainProfile = (req, res) => {
    const  captain  = req.user;
    if (!captain) {
        return res.status(404).json({ message: "Captain not found" });
    }
    return res.status(200).json({ message: "Captain profile", captain });   
}
