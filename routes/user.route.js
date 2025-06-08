import { Router } from "express";
import {body } from "express-validator";
import { registerUser ,loginUser} from "../controllers/user.contoller.js";
const router  = Router();
router.route('/register').post([body('email').isEmail().withMessage('invalid email'),body('fullname.firstname').isLength({min:3}).withMessage('enter minimun 3 at least 3 charcater'),body('password').isLength({min:6}).withMessage("enter at least 6 character")],registerUser);
router.route('/login').post([body('email').isEmail().withMessage('invalid email'),body('password').isLength({min:6}).withMessage("enter at least 6 character")],loginUser);



export default router;