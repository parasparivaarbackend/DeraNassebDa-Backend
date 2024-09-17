import { asyncHandler } from "../utils/asyncHandler.js";
import { BlogModel } from "../Model/blog.model.js";
import { InnerBlogModel } from "../Model/InnerBlog.model.js";
import { DeleteImage } from "../utils/ImageHandler.js";

export const createBlog = asyncHandler(async (req, res) => {
  const { title, slug } = req.body;

  if ([title, slug].some((item) => item?.trim() === "")) {
    return res.status(400).json({ message: "title and slug is required" });
  }
  const existingBlog = await BlogModel.findOne({ slug });

  if (existingBlog) {
    return res
      .status(400)
      .json({ message: "Blog already exists with the same slug" });
  }

  const data = await BlogModel.create({ title, slug, user_id: req.user._id });

  return res.status(200).json({ data, message: "Blog Created successfully" });
});

export const updateBlog = asyncHandler(async (req, res) => {
  const data = req.body;

  const blog = await BlogModel.findByIdAndUpdate(
    { _id: data?._id },
    { ...data },
    { new: true }
  );

  return res.status(200).json({ blog, message: "Blog updated" });
});

export const getBlog = asyncHandler(async (req, res) => {
  const { query } = req;
  const limit = Number(query.limit) || 5;
  const index = Number(query.index) || 1;
  const newLimit = limit * index;

  const data = await BlogModel.aggregate([
    {
      $lookup: {
        from: "innerblogs",
        foreignField: "blogId",
        localField: "_id",
        as: "BlogData",
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(newLimit);
  if (!data) {
    return res.status(400).json({ message: "No Blog found" });
  }

  return res.status(200).json({ data });
});

export const getBlogAdmin = asyncHandler(async (req, res) => {
  const { query } = req;
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 5;
  const newPage = limit * (page - 1);

  const data = await BlogModel.find()
    .skip(newPage)
    .limit(limit)
    .sort({ _id: -1 });

  if (!data) return res.status(400).json({ message: "No Blog found" });

  return res.status(200).json({ data });
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const data = req.body;

  if (!data._id) return res.status(400).json({ message: "incorrect Blog id" });

  const find = await BlogModel.findById(data?._id);
  if (!find) return res.status(400).json({ message: "Blog do not exist" });

  const InnerBlog = await InnerBlogModel.find({ blogId: find?._id });

  if (InnerBlog?.length === 0) {
    await BlogModel.findByIdAndDelete(find?._id);
    return res.status(200).json({ message: "Blog deleted successfully" });
  }

  if (InnerBlog && InnerBlog.length > 0) {
    for (let blog of InnerBlog) {
      if (blog?.image && blog.image.length > 0)
        await DeleteImage(blog?.image[0]?.image_id);

      await InnerBlogModel.findByIdAndDelete(blog?._id);
    }
    await BlogModel.findByIdAndDelete(find?._id);
    return res.status(200).json({ message: "Blog deleted successfully" });
  }
});
