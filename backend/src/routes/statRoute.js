import { Router } from "express"
import { getStats } from "../controller/statController.js";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";
const router=Router();

router.get('/',protectRoute,requireAdmin,getStats)

export default router;