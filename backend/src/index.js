import express from "express"
import { clerkMiddleware } from '@clerk/express';
import userRoutes from './routes/userRoutes.js'
import albumRoutes from './routes/albumRoutes.js'
import songRoutes from './routes/songRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import authRoutes from './routes/authRoutes.js'
import dotenv from "dotenv"
import { ConnectDb } from "./lib/db.js"
import fileUpload from "express-fileupload";
import path from "path"

dotenv.config()

const PORT=process.env.PORT
const __dirname=path.resolve();


const app=express();
app.use(express.urlencoded({extended:true}));//this is used for parsing the data 
app.use(clerkMiddleware());//for using the clerk Middleware
app.use(fileUpload({
  useTempFiles:true,
    tempFileDir:path.join(__dirname,'tmp'),
    createParentPath:true,
    limits:{
        fileSize: 10 * 1024 * 1024 // 5MB
    }

}));

app.get('/',(req,res)=>{
    res.send("Backend is running ")
})
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/songs',songRoutes);
app.use('/api/albums',albumRoutes);
// app.use('/api/stats',);

//error handler 
app.use((err,req,res,next)=>{
    res.status(500).json({message:process.env.NODE_ENV === 'development' ? err.message : "Internal Server error"})
})

app.listen(PORT,()=>{
    console.log("Server is running on port 3000")
    ConnectDb();
});