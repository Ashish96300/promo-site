import {Router} from "express"
import { upload } from "../midllewares/multer.middlewears.js"
import { addProject ,getAllProject } from "../controllers/project.controller.js"

const router=Router()

router.route("/add-project").post(upload.single("image") ,addProject)
router.route('/get-all-project').get(getAllProject)

export default router