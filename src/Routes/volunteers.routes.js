import { Router } from "express";
import {
  createvolunteers,
  deleteVolunteer,
  getAllVolunteers,
} from "../Controller/volunteers.controller.js";
import { upload } from "../middleware/multter.middleware.js";
import { volunteersValidation } from "../validation/index.validation.js";
import { auth } from "../middleware/Authentication.middleware.js";

const router = Router();

router
  .route("/create")
  .post(upload.single("image"), volunteersValidation, createvolunteers);
router.route("/get?").get(auth, getAllVolunteers);
router.route("/delete").delete(auth, deleteVolunteer);

export default router;
