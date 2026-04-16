import {Song} from "../models/songModel.js"
import {Album} from "../models/albumModel.js"

const uploadToCloudinary=async(file)=>{
    try{
        //upload the file to cloudinary and return the url
        const result=await uploadToCloudinary.uploader.upload(file.tempFilePath,{
            resource_type:"auto",}
        )
        return result.secure_url;//isse url mil jayega jo hume database me save karna hai
    }
    catch(err){
        console.log("Error uploading to cloudinary",err)
        throw new Error("Error uploading to cloudinary")

    }
}

export const createSong=async(req,res)=>{
    try{
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({messgae:"Please upload the audo files first "})
        }
        const {title,artist,albumId,duration}=req.body;
        const audioFile=req.files.audioFile;
        const imageFile=req.files.imageFile;
        const audioUrl=await uploadToCloudinary(audioFile);
        const imageUrl=await uploadToCloudinary(imageFile);



        //let us create a new song in the database 
        const song=new Song({
            title,
            artist,
            imageUrl,
            audioUrl,
            duration,
            albumId:albumId || null
        })
        await song.save();

        //if the song belongs to an album, add it there too 
        if(albumId){
            await Album.findByIdAndUpdate(albumId,{$push:{songs:song._id}})
        }
        res.status(201).json({message:"song created successfully",song})
    }
    catch(err){
        next(err)
    }
}

//gaana ko delete karne k liye v to function chahiye hoga 
export const deleteSong=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const song=await Song.findById(id);

        //delete karne se pahle apne ko album se bhi uss gaane ko nikalna parega 
        if(song.albumId){
            await Album.findByIdAndUpdate(
                song.albumId,
                {$pull:{songs:song._id}},
            )
        }
        await Song.findByIdAndDelete(id);
        res.status(200).json({message:"song deleted successfully"})

    }
    catch(err){
        console.log("error deleting the song ",err)
        next(err)
    }
}

export const createAlbum=async(req,res,next)=>{
    try{
        const{title,artist,releaseYear}=req.body;
        const imageFile=req.files
        const imageUrl=await uploadToCloudinary(imageFile);

        const album=new Album({
            title,
            artist,
            imageUrl,
            releaseYear
        })
        await album.save();
        res.status(201).json({message:"Album created successfully",album
        })

    }
    catch(err){
        console.log("Error creating album ",err)
        next(err)
    }
}

export const deleteAlbum=async(req,res,next)=>{
    try{
        const  {id}=req.params;

        //album ko delete karne se pehle uske andar k gaane ko delte karna parega
        await Song.deleteMany({albumId:id})
        await Album.findByIdAndDelete(id);
        res.status(200).json({message:"Album deleted successfully"})
    }
    catch(err){
        console.log("Error deleting album,",err);
        next(err);
    }
}

export const checkAdmin=async(req,res,next)=>{
    res.send({isAdmin:true})
}