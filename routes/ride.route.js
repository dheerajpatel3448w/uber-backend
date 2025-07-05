import { Router } from "express";
import { body ,query} from "express-validator";
import { createride2, getfare2,confirmride,confirmstartride ,endride} from "../controllers/ride.controller.js";
import { verifyCaptain, verifyjwt } from "../middlewares/verifyjwt.middleware.js";
const router4 = Router();

router4.route("/createride").post([
    body("pickup").isString().isLength({min:3,max:1000}).withMessage("invalid pickup"),
    body("destination").isString().isLength({min:3,max:1000}).withMessage("invalid destination"),
    body("vehicletype").isString().isLength({min:3,max:1000}).withMessage("invalid vehical"),
],verifyjwt,createride2)

router4.route("/getfare").get([
    query("pickup").isString().isLength({min:3,max:1000}).withMessage(" invalid pickup"),
    query("destination").isString().isLength({min:3,max:1000}).withMessage(" invalid destination"),
],verifyjwt,getfare2);

router4.route("/confirm").post([
    body("rideId").isString().isLength({min:3,max:1000}).
    withMessage("invalid ride id"),


],verifyCaptain,confirmride)

router4.route('/start-ride').post([
    body('rideId').isString().isLength({min:3,max:1000}). withMessage('invalid ride id'),
    body('otp').isLength({min:3,max:1000 }).withMessage('invalid otp')
],verifyCaptain,confirmstartride)

router4.route('/end-ride').post([
    body('rideId').isString().isLength({min:3,max:1000}). withMessage('invalid ride id'),
],verifyCaptain,endride);
export default router4;

