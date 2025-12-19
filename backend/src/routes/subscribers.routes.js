import {Router} from "express"
import { upload } from "../midllewares/multer.middlewears.js"

const router=Router()

router.route("/add-sub").post(addSub)
router.route('/get-all-sub').get(getAllSub)

export default router