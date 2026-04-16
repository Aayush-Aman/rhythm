import {User} from '../models/userModel.js';
export const getAllUsers=async(req,res,next)=>{
    try{
        const currUser=req.auth.userId;

        const allUsers=User.find({clerkId : {$ne:currUser}});
        res.status(200).json(allUsers);

    }
    catch(err){
        console.log("Error fetching all users ")
        next(err);
    }
}