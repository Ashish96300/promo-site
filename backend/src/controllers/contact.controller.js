import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Contact} from "../models/ContactForm.model.js";

const addContact = asyncHandler(async (req, res) => {
    const { fullName, email, mobileNumber, city } = req.body;

    if (!fullName || !email || !mobileNumber || !city) {
        throw new ApiError(400, "all fields are required");
    }

    const contact = await Contact.create({
        fullName,
        email,
        mobileNumber,
        city,
    });

    const createdContact = await Contact.findById(contact._id);
    if (!createdContact) {
        throw new ApiError(400, "failed creating contact");
    }

    return res.status(201).json(
        new ApiResponse(201, createdContact, "contact created successfully")
    );
});

const getAllContact = async (req, res) => {
    try {
        const contacts = await Contact.find()

        if (contacts.length === 0) {
            return res.status(400).json({ message: 'No contact details found' });
        }

        return res.status(200).json({ contacts: contacts });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return res.status(500).json({ message:'Internal Server Error' });
    }
};
export {addContact ,getAllContact}