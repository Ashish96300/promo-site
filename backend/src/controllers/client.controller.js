import { asyncHandler } from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { uploadOnCloudinary } from "../utils/Cloudinary";
import { Client } from "../models/client.model";

const addClient=asyncHandler(async (req ,res)=>{
   res.status(200).json({            
        message:"ok"
    })

    const {name ,designation ,description}=req.body

    if (
        [name ,designation,description]
        .some((field)=>field?.trim()==="")                    
    ) {                                                 
        throw new ApiError(400,"all fields are required");
    }

    const existedClient=await Client.findOne({
        $or:[{name},{designation}]
        
    })
    if(existedClient){
        throw new ApiError(409 ,'client already exist')
    }
    const imageLocalPath = req.file?.path;
    
    if (!imageLocalPath) {
        throw new ApiError(400, 'image required');
    }
    const image = await uploadOnCloudinary(imageLocalPath); 
    
    if (!image) {
        throw new ApiError(400, 'image upload failed');
    }
    const client=await Client.create({
        name,
        designation,
        description,
        image:image?.url,
    })
    const createdclient = Client.findById(client._id)

    if(!createdclient){
        throw new ApiError(400 ,'failed creataing client')
    }
    return res.
    status(201).
    json(new ApiResponse(200 ,createdclient ,'client created sucessfully'))
})

const getAllClient = async (req, res) => {
    try {
        const clients = await Client.find()

        if (clients.length === 0) {
            return res.status(400).json({ message: 'No client details found' });
        }

        return res.status(200).json({ clients: clients });
    } catch (error) {
        console.error('Error fetching clients:', error);
        return res.status(500).json({ message:'Internal Server Error' });
    }
};
export {addClient ,getAllClient}