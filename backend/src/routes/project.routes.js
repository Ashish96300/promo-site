import {Router} from "express"
import { addProject ,getAllProject } from "../controllers/project.controller.js"
import { upload } from "../middlewares/multer.middleware.js"

const router=Router()

router.route("/add-project").post(upload.single("image") ,addProject)
router.route('/get-all-project').get(getAllProject)

export default router