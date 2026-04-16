import {Song} from "../models/songModel.js";

export const getAllSongs=async(req,res,next)=>{
    try{
        //if we sort and give -1 , then it sorts in descending order and latest song will come first
        const songs=await Song.find().sort({createdAt:-1});
        return res.status(200).json(songs);

    }
    catch(err){
        console.log("Error fetching songs ");
        next(err)
    }
}

export const getFeatured=async(req,res,next)=>{
    try{
        const songs=await Song.aggregate([
            {
                $sample: {size: 6}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                },
            },
        ])
        return res.status(200).json(songs);
    }
    catch(err){
        console.log("Error fetching featured songs ")
        next(err);
    }


}
export const getMadeForYou=async(req,res,next)=>{
     try{
        const songs=await Song.aggregate([
            {
                $sample: {size: 4}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                },
            },
        ])
        return res.status(200).json(songs);
    }
    catch(err){
        console.log("Error fetching featured songs ")
        next(err);
    }


}
export const getTrending=async(req,res,next)=>{
     try{
        const songs=await Song.aggregate([
            {
                $sample: {size: 4}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                },
            },
        ])
        return res.status(200).json(songs);
    }
    catch(err){
        console.log("Error fetching featured songs ")
        next(err);
    }


}