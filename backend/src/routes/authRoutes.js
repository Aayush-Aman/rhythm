import { Router } from "express";
const router=Router();

router.get('/',(req,res)=>{
    res.send("auth routes api hit ")
})

export default router;