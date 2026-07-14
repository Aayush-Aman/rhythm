import {User} from '../models/userModel.js';
import { Message } from '../models/messgaeModel.js';
export const getAllUsers=async(req,res,next)=>{
    try{
        const authData=req.auth();
        const currUser=authData.userId;
        console.log("Current User ID:", currUser); // Debug: Check the current user ID

        const allUsers=await User.find({clerkId : {$ne:currUser}});
        // console.log("All Users Fetched:", allUsers); // Debug: Check the fetched users
        res.status(200).json(allUsers);

    }
    catch(err){
        console.log("Error fetching all users ")
        next(err);
    }
}

export const getMessages = async (req, res, next) => {
	try {
		const myId = req.auth.userId;
		const { userId } = req.params;

		const messages = await Message.find({
			$or: [
				{ senderId: userId, receiverId: myId },
				{ senderId: myId, receiverId: userId },
			],
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
	} catch (error) {
		next(error);
	}
};