import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";
import { createSong,deleteSong,createAlbum,deleteAlbum,checkAdmin} from "../controller/adminController.js";

const router=Router();

router.use(protectRoute,requireAdmin) //ye dono middleware lagane se ye ensure hoga ki sirf admin hi in routes ko access kar paye;

router.post('/songs',createSong)
router.delete('/songs/:id',deleteSong)

router.post('/albums',createAlbum)
router.delete('/albums/:id',deleteAlbum)

//we even need a butto if the user is the admin or not , so that we can show the admin dashboard button to the user

router.get('check',checkAdmin)
export default router;