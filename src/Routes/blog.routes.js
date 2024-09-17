import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogAdmin,
  updateBlog,
} from "../Controller/blog.controller.js";
import { upload } from "../middleware/multter.middleware.js";
import {
  BlogValidation,
  InnerBlogValidation,
} from "../validation/index.validation.js";
import { auth } from "../middleware/Authentication.middleware.js";
import {
  addBlog,
  deleteInnerBlog,
  getInnerBlog,
  updateInnerBlog,
} from "../Controller/InnerBlog.controller.js";

const router = Router();

router.route("/create").post(auth, BlogValidation, createBlog);
router.route("/update").patch(auth, BlogValidation, updateBlog);
router.route("/get").get(getBlog);
router.route("/get-admin").get(auth, getBlogAdmin);

router.route("/delete").delete(auth, deleteBlog);

//Sub Blogs
router
  .route("/addBlog")
  .post(auth, upload.single("image"), InnerBlogValidation, addBlog);
router
  .route("/updateInnerBlog")
  .patch(auth, upload.single("image"), InnerBlogValidation, updateInnerBlog);
router.route("/getInnerBlog").get(getInnerBlog);
router.route("/deleteInnerBlog").delete(auth, deleteInnerBlog);

export default router;
