import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subcriber } from "../models/NewsletterSub.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

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