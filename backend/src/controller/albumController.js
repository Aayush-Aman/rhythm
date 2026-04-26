import {Album} from "../models/albumModel.js";
export const getAlbums=async(req,res,next)=>{
    console.log("api for fetching the albums is hit")
    try{
        const albums=await Album.find();
        res.status(200).json(albums);
    }
    catch(err){
        console.log("Error fetching albums");
        next(err);
    }
}


export const getAlbumById=async(req,res,next)=>{
        console.log("api for fetching single album is hit")
    try{
        const {id}=req.params;
        console.log("Album ID from request params:", id);
        const album=await Album.findById(id).populate('songs');
        if(!album){
            return res.status(404).json({message:"Album not found"})
        }
        res.status(200).json(album);
    }
    catch(err){
        console.log("Specific album fetching error");
        next(err);
    }
    
}