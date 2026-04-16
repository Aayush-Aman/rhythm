import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";
import { createSong } from "../controller/adminController.js";
const router=Router();

router.get('/',protectRoute,requireAdmin,createSong)

export default router;