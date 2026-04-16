import {Router} from 'express'
import { getAllUsers } from '../controller/usercontroller.js';
import { protectRoute } from '../middleware/authMiddleware.js';
const router=Router()

console.log("user routes are atleast getting triggered ")

// router.get('/',(req,res)=>{
//     console.log("api v hit ho rha hai ")
//     res.send("User route is working")
// })

router.get('/',protectRoute,getAllUsers)

export default router