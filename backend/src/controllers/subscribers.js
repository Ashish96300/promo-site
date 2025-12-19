import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Subcriber, Subcriber } from "../models/NewsletterSub.model";

const addSubcriber=asyncHandler(async (req ,res)=>{
   res.status(200).json({            
        message:"ok"
    })

    const {email}=req.body

    if (
        email
        .some((field)=>field?.trim()==="")) {                                                 
        throw new ApiError(400,"all fields are required");
    }

    const Subcriber =await Subcriber.create({
        email ,
    })
    const createdSubscriber = Subcriber.findById(Subcriber._id)

    if(!createdSubscriber){
        throw new ApiError(400 ,'failed adding Subcriber')
    }
    return res.
    status(201).
    json(new ApiResponse(200 ,createdSubscriber,'subcriber added sucessfully'))
})

const getAllSubscriber = async (req, res) => {
    try {
        const subscriber = await Subcriber.find()

        if (subscriber.length === 0) {
            return res.status(400).json({ message: 'No subscriber details found' });
        }

        return res.status(200).json({ subscriber: subscriber });
    } catch (error) {
        console.error('Error fetching subscriber:', error);
        return res.status(500).json({ message:'Internal Server Error' });
    }
};
export {addSubcriber ,getAllSubscriber}