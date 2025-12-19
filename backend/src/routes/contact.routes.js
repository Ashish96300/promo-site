import {Router} from "express"
import { upload } from "../midllewares/multer.middlewears.js"

const router=Router()

router.route("/add-contact").post(addContact)
router.route('/get-all-contact').get(getAllContact)

export default router