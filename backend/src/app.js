import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";
const app = express();

const allowedOrigins = [
  process.env.CORS_ORIGIN || 'http://localhost:5173',
  'http://localhost:5173'
];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {  
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));                                        
app.use(express.urlencoded({ extended: true, limit: "16kb" }));                
app.use(express.static("public"));                                           
app.use(cookieParser());                                                    
console.log(process.env.CORS_ORIGIN);



app.use(errorMiddleware);
export { app };