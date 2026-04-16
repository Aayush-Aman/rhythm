import { Song } from "../models/songModel.js";
import { Album } from "../models/albumModel.js";
import { User } from "../models/userModel.js";

export const getStats=async(req,res,next)=>{
    // const totalSongs=await Song.countDocuments();
    // const totalAlbums=await Album.countDocuments();
    // const totalUsers=await User.countDocuments();
    
    //doing the optimiation of above task
    try{
    const [totalSongs,totalAlbums,totalUsers,totolArtist]=Promise.all([
        await Song.countDocuments(),
        await Album.countDocuments(),
        await User.countDocuments(),
        //albums kitne hai , usko pata karne k liye 

        await Song.aggregate([
          {
            $unionWith:{
                coll:"albums",
                pipeline:[],
            },
        },
            {
                $group:{
                    _id:"artist",
                },
            },
            {
                $count:"count",
            },

    ])

])
    res.status(200).json({
        totalSongs,
        totalAlbums,
        totalUsers,
        totolArtist:totolArtist[0]?.count || 0, //agar count nahi hai to 0 return kardo
    })
    }
    catch(err){
        console.log("Error fetching stats ")
        next(err);
    }
}