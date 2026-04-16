import { Router } from "express";
import { authCallback } from "../controller/authController.js";

const router=Router();

router.get('/',(req,res)=>{
    res.send("auth routes api hit ")
})
router.post('/callback',authCallback)

export default router;