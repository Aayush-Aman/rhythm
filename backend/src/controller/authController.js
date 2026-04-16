import { User } from "../models/userModel.js";

export const authCallback=async(req,res,next)=>{
    try{
        const {id,firstName,lastName,imageUrl}=req.body;

        //check if the  user already exists or not 
        const user=await User.findOne({clerkId:id})


        //if it does not , it should create the user in the database 
        if(!user){
        await User.create({
            fullname:`${firstName} ${lastName}`,
            imageUrl,
            clerkId:id
        })
        res.status(200).json({message:"User created successfully"})
    }
    }
    catch(err){
        console.log("Error in auth callback")
        next(err)
    }
}