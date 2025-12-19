import { asyncHandler } from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Contact} from "../models/ContactForm.model";

const addContact=asyncHandler(async (req ,res)=>{
   res.status(200).json({            
        message:"ok"
    })

    const {fullName ,email ,mobileNumber ,city}=req.body

    if (
        [fullName ,email ,mobileNumber ,city]
        .some((field)=>field?.trim()==="")                    
    ) {                                                 
        throw new ApiError(400,"all fields are required");
    }

    const Contact =await Contact.create({
        fullName ,
        email ,
        mobileNumber,
        city
    })
    const createdContact = Contact.findById(Contact._id)

    if(!createdContact){
        throw new ApiError(400 ,'failed creataing contact')
    }
    return res.
    status(201).
    json(new ApiResponse(200 ,createdContact ,'contact created sucessfully'))
})

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