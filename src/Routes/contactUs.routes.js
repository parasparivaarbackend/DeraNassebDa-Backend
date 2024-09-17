import { Router } from "express";
import { createContactUs, deleteContactUs, GetContactUs } from "../Controller/contact.controller.js";
import { auth } from "../middleware/Authentication.middleware.js";
import { contactUsValidation } from "../validation/index.validation.js";

const router = Router()


router.route("/").post(contactUsValidation, createContactUs)
router.route("/get?").get(auth, GetContactUs)
router.route("/delete").delete(auth, deleteContactUs)

export default router 