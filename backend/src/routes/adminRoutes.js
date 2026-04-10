import { Router } from "express";
const router=Router();

router.get('/',(req,res)=>{
    res.send("Admin routes api hit ")
})

export default router;