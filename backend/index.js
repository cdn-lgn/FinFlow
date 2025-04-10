import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"

dotenv.config()

connectDB()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
res.send("Welcome to FinFlow Backend Server")
})

const PORT = process.env.PORT || 5000
app.listen(PORT ,()=>{
console.log("server is running on port  ---> ",PORT)
})
