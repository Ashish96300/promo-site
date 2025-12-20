import mongoose from "mongoose";
const projectSchema =new mongoose.Schema({
   
    projectImage:{
        type:String,
        required:true,
        trim: true
    },
    projectName:{
        type:String,
        required:true,
        trim: true
    },
     projectDescription:{
        type:String,
        required:true,
        trim: true
    },   
} ,{timestamps:true})

export const Project= mongoose.model('Project' ,projectSchema)
