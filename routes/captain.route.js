import { Router } from "express";
 import { body } from "express-validator";
 import { registerCaptain ,loginCaptain, logoutCaptain,captainProfile} from "../controllers/captain.controller.js";
import { verifyCaptain } from "../middlewares/verifyjwt.middleware.js";
import jwt from "jsonwebtoken";
const router2 = Router();

router2.route('/register').post([
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),  
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),   
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'), 
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'), 
    body('vehicle.platenumber').isLength({ min: 3 }).withMessage('Vehicle number must be at least 3 characters long'),  
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),  
    body('vehicle.vehicletype').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be either car, bike, or auto')
],registerCaptain);



router2.route('/login').post(body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
   loginCaptain
);

router2.route('/logout').get(verifyCaptain,logoutCaptain);

 router2.route('/profile').get(verifyCaptain, captainProfile); // Uncomment if you have a profile route   
export default router2;