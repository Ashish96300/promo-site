import mongoose from "mongoose";
const subcribersSchema =new mongoose.Schema({

    email:{
        type:String,
        required:true,
        lowercase: true
    },
} ,{timestamps:true})

export const Subscriber = mongoose.model('Subscriber ' ,subcribersSchema)