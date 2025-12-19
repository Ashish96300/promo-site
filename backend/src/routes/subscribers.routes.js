import {Router} from "express"
import { addSubcriber ,getAllSubscriber } from "../controllers/subscribers"

const router=Router()

router.route("/add-sub").post(addSubcriber)
router.route('/get-all-sub').get(getAllSubscriber)

export default router