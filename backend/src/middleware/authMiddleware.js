import {clerkClient} from "@clerk/express";

//protect route bas itna hai ki user login hai ya nahi 
export const protectRoute=async(req,res,next)=>{
    if(!req.auth || !req.auth.userId){
        return res.status(401).json({message:"Unauthorized"})
    }
    next();
}


//require admin ka email admin k email se match karna chaiye , nahi to wo admin nahi hai 
export const requireAdmin=async(req,res,next)=>{
    try{
        const currUser=await clerkClient.users.getUser(req.auth.userId);
        const isAdmin=process.env.ADMIN_EMAIL === currUser.primaryEmailAddress?.emailAddress;
        if(!isAdmin){
            return res.status(403).json({message:"Forbidden: Admin only allowed "})
        }
        next();
    }
    catch{
        return res.status(500).json({message:"Internal Server Error"})
    }
}