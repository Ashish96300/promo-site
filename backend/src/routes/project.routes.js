import {Router} from "express"
import { upload } from "../midllewares/multer.middlewears.js"

const router=Router()

router.route("/add-project").post(upload.single("image") ,addProject)
router.route('/get-all-project').get(getAllProject)

export default router