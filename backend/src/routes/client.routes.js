console.log("CLIENT ROUTES LOADED");

import {Router} from "express"
import { addClient ,getAllClient } from "../controllers/client.controller.js"
import { upload } from "../middlewares/multer.middleware.js"

const router=Router()

router.route("/add-client").post(upload.single("image") ,addClient)
router.route('/get-all-client').get(getAllClient)

export default router