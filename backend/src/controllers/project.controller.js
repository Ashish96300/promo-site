import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { Project } from "../models/project.model.js";

const addProject = asyncHandler(async (req, res) => {
    const { projectName, projectDescription } = req.body;

    if (!projectName || !projectDescription) {
        throw new ApiError(400, "all fields are required");
    }

    const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
        throw new ApiError(400, "image required");
    }

    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image) {
        throw new ApiError(400, "image upload failed");
    }

    const project = await Project.create({
        projectName,
        projectDescription,
        projectImage: image.url,
    });

    const createdProject = await Project.findById(project._id);
    if (!createdProject) {
        throw new ApiError(400, "failed creating project");
    }

    return res.status(201).json(
        new ApiResponse(201, createdProject, "project created successfully")
    );
});


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