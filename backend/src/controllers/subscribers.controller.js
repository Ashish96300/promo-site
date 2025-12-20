import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Subscriber  } from "../models/newsletterSub.model.js";

const addSubcriber  = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email || email.trim() === "") {
        throw new ApiError(400, "email is required");
    }

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
        throw new ApiError(409, "subscriber already exists");
    }

    const subscriber = await Subscriber.create({ email });

    const createdSubscriber = await Subscriber.findById(subscriber._id);
    if (!createdSubscriber) {
        throw new ApiError(400, "failed adding subscriber");
    }

    return res.status(201).json(
        new ApiResponse(201, createdSubscriber, "subscriber added successfully")
    );
});

const getAllSubscriber = async (req, res) => {
    try {
        const subscriber = await Subscriber.find();

        if (subscriber.length === 0) {
            return res.status(404).json({ 
                subscribers: [], 
                message: 'No subscriber details found' 
            });
        }
        return res.status(200).json({ subscribers: subscriber });
    } catch (error) {
        console.error('Error fetching subscriber:', error);
        return res.status(500).json({ 
            subscribers: [], // ✅ Always return the array key
            message: 'Internal Server Error' 
        });
    }
};

export {addSubcriber ,getAllSubscriber}
