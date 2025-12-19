import {Router} from "express"
import { upload } from "../midllewares/multer.middlewears.js"
import { addClient ,getAllClient } from "../controllers/client.controller.js"

const router=Router()

router.route("/add-client").post(upload.single("image") ,addClient)
router.route('/get-all-client').get(getAllClient)

export default router