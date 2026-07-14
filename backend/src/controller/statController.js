import { Song } from "../models/songModel.js";
import { Album } from "../models/albumModel.js";
import { User } from "../models/userModel.js";

export const getStats=async(req,res,next)=>{
    // const totalSongs=await Song.countDocuments();
    // const totalAlbums=await Album.countDocuments();
    // const totalUsers=await User.countDocuments();
    
    //doing the optimiation of above task
    try{
    const [totalSongs, totalAlbums, totalUsers, artistCount] = await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),
        Song.aggregate([
            {
                $project: { artist: 1 },
            },
            {
                $unionWith: {
                    coll: "albums",
                    pipeline: [
                        {
                            $project: { artist: 1 },
                        },
                    ],
                },
            },
            {
                $group: {
                    _id: "$artist",
                },
            },
            {
                $count: "count",
            },
        ])
    ])
    res.status(200).json({
        totalSongs,
        totalAlbums,
        totalUsers,
        totalArtists: artistCount[0]?.count || 0, //agar count nahi hai to 0 return kardo
    })
    }
    catch(err){
        console.log("Error fetching stats ")
        next(err);
    }
}