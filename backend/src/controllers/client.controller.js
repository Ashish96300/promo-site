import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { Client } from "../models/client.model.js";

const addClient = asyncHandler(async (req, res) => {
    const { name, designation, description } = req.body;

    if (!name || !designation || !description) {
        throw new ApiError(400, "all fields are required");
    }

    const existedClient = await Client.findOne({
        $or: [{ name }, { designation }]
    });

    if (existedClient) {
        throw new ApiError(409, "client already exists");
    }

    const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
        throw new ApiError(400, "image required");
    }

    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image) {
        throw new ApiError(400, "image upload failed");
    }

    const client = await Client.create({
        name,
        designation,
        description,
        image: image.url
    });

    const createdClient = await Client.findById(client._id);

    return res.status(201).json(
        new ApiResponse(201, createdClient, "client created successfully")
    );
});
const getAllClient = async (req, res) => 
    { try { const clients = await Client.find() 
        if (clients.length === 0) 
            { 
                return res.status(400).json({ message: 'No client details found' }); 
            } 
            return res.status(200).json({ clients: clients }); 
        } catch (error) { console.error('Error fetching clients:', error); 
            return res.status(500).json({ message:'Internal Server Error' });
         } };

export {addClient ,getAllClient}