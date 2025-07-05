import { verifyjwt } from "../middlewares/verifyjwt.middleware.js";
import { query } from "express-validator";
import { Router } from "express"
import { getcoordinates ,getdistancetime,getautosuggestion} from "../controllers/map.controller.js";

const router3 = Router();

router3.route('/get-coordinate').get([query("address").isString().isLength({min:3})],verifyjwt,getcoordinates);
router3.route("/get-distance-time").get([query('origin').isString().isLength({min:3}),query("destination").isString().isLength({min:3})],verifyjwt,getdistancetime);
router3.route('/get-suggestions').get([query("input").isString().isLength({min:3})],verifyjwt,getautosuggestion);


export default router3