import {clerkClient} from "@clerk/express";

//protect route bas itna hai ki user login hai ya nahi 
// Change your check to this:
export const protectRoute = async (req, res, next) => {
    console.log("protect route middleware is hit");

    // In the new @clerk/express, req.auth() is a function that returns the auth object
    const authData = req.auth(); 

    // Debug: Let's see what is INSIDE the auth object
    console.log("User ID from Clerk:", authData.userId);

    if (!authData || !authData.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    next();
}


//require admin ka email admin k email se match karna chaiye , nahi to wo admin nahi hai 
export const requireAdmin=async(req,res,next)=>{
    try{
        const authData=req.auth();
        const currUser=await clerkClient.users.getUser(authData.userId);
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