import { Router } from "express";
import { getAllSongs,getFeatured,getTrending,getMadeForYou } from "../controller/songController.js";

const router=Router();

router.get('/',(req,res)=>{
    res.send("song routes api hit ")
})

router.get('/songs',getAllSongs);
router.get('/featured',getFeatured)
router.get('/trending',getTrending)
router.get('/made-for-you',getMadeForYou)
export default router;