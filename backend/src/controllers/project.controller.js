import { asyncHandler } from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { uploadOnCloudinary } from "../utils/Cloudinary";
import { Project } from "../models/project.model";

const addProject = asyncHandler(async (req ,res)=>{
   res.status(200).json({            
        message:"ok"
    })

    const {projectsrojectName ,projectDescription}=req.body

    if (
        [projectsrojectName ,projectDescription]
        .some((field)=>field?.trim()==="")                    
    ) {                                                 
        throw new ApiError(400,"all fields are required");
    }

    const imageLocalPath = req.file?.path;
    
    if (!imageLocalPath) {
        throw new ApiError(400, 'image required');
    }
    const image = await uploadOnCloudinary(imageLocalPath); 
    
    if (!image) {
        throw new ApiError(400, 'image upload failed');
    }
    const project =await Project.create({
        projectsrojectName,
        projectDescription,
        projectImage:image?.url,
    })
    const createdproject = Project.findById(project._id)

    if(!createdproject){
        throw new ApiError(400 ,'failed creataing project')
    }
    return res.
    status(201).
    json(new ApiResponse(200 ,createdproject,'project created sucessfully'))
})

const getAllProject = async (req, res) => {
    try {
        const projects = await Project.find()

        if (projects.length === 0) {
            return res.status(400).json({ message: 'No project details found' });
        }

        return res.status(200).json({ projects : projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ message:'Internal Server Error' });
    }
};
export {addProject ,getAllProject}