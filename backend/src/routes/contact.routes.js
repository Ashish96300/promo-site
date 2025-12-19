import {Router} from "express"
import { addContact ,getAllContact } from "../controllers/contact.controller.js"

const router=Router()

router.route("/add-contact").post(addContact)
router.route('/get-all-contact').get(getAllContact)

export default router