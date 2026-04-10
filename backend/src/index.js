import express from "express"
import userRoutes from './routes/userRoutes.js'
import albumRoutes from './routes/albumRoutes.js'
import songRoutes from './routes/songRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import authRoutes from './routes/authRoutes.js'
import dotenv from "dotenv"

dotenv.config()

const PORT=process.env.PORT


const app=express()

app.get('/',(req,res)=>{
    res.send("Backend is running ")
})
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/songs',songRoutes);
app.use('/api/albums',albumRoutes);
// app.use('/api/stats',);

app.listen(PORT,()=>{
    console.log("Server is running on port 3000")
})