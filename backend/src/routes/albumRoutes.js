import { Router } from "express";
const router=Router();

router.get('/',(req,res)=>{
    res.send("Album routes api hit ")
})

export default router;