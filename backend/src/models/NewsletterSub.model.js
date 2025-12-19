import mongoose from "mongoose";
const subcribersSchema =new mongoose.Schema({

    email:{
        type:String,
        required:true,
        lowercase: true
    },
} ,{timestamps:true})

export const Subcriber= mongoose.model('Subcriber' ,subcribersSchema)