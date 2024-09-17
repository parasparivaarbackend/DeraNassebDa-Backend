import { Router } from "express";
import {
  createDonation,
  FeatureDonation,
  GetDonation,
  payment,
} from "../Controller/Donation.controller.js";
import { donationValidation } from "../validation/index.validation.js";
import { auth } from "../middleware/Authentication.middleware.js";

const router = Router();

router.route("/payment").post(payment);
router.route("/createdonation").post(donationValidation, createDonation);
router.route("/get?").get(auth, GetDonation);
router.route("/featureDonation").get(FeatureDonation);

export default router;
