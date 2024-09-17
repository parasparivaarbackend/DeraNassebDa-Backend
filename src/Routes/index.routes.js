import { Router } from "express";

const router = Router()

import Admin_Login_Signup from "./user.routes.js"
import BlogRoutes from "./blog.routes.js"
import ContactRouter from "./contactUs.routes.js"
import donationRouter from "./donation.routes.js"
import volunteerRouter from "./volunteers.routes.js"




router.use("/admin", Admin_Login_Signup)
router.use("/admin/blog", BlogRoutes)
router.use("/contact-us", ContactRouter)
router.use("/donation", donationRouter)
router.use("/volunteer", volunteerRouter)





export default router

