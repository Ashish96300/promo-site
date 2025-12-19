import {v2 as cloudinary} from "cloudinary";

import fs from 'fs'

import dotenv from 'dotenv'
dotenv.config();

cloudinary.config();
  

const uploadOnCloudinary = async (localFilePath) => {  
    try {
        if (!localFilePath) {
            console.log("No local file path provided.");
            return null
        }
        console.log("Uploading file to Cloudinary:", localFilePath);

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",                      
        })
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.error(" Cloudinary Upload Error:", error);
        if (fs.existsSync(localFilePath));
        return null;
    }
}



export {uploadOnCloudinary}