import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { app } from './app.js';


dotenv.config({   
    path: './.env'
})

app.get("/" ,(req ,res)=>{
    res.send("Server is running...");     
})

connectDB()
.then(8000 || process.env.PORT, () => {
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
})
.catch((err)=>{
    console.log(err)
})