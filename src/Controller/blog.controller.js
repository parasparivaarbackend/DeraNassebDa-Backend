import { asyncHandler } from "../utils/asyncHandler.js";
import { BlogModel } from "../Model/blog.model.js";
import { DeleteImage } from "../utils/ImageHandler.js";

export const createBlog = asyncHandler(async (req, res) => {
  const { title, slug, alt, description } = req.body;
  const file = req.file;

  if ([title, slug].some((item) => item?.trim() === "")) {
    return res.status(400).json({ message: "title and slug is required" });
  }
  if (!file) return res.status(400).json({ message: "Image is required" });
  const existingBlog = await BlogModel.findOne({ slug });

  if (existingBlog) {
    return res
      .status(400)
      .json({ message: "Blog already exists with the same slug" });
  }

  let uploadImage = await ImageUpload(file);

  const data = await BlogModel.create({
    title,
    slug,
    alt,
    description,
    image: uploadImage,
    user_id: req?.user?._id,
  });

  return res.status(200).json({ data, message: "Blog Created successfully" });
});

export const updateBlog = asyncHandler(async (req, res) => {
  const data = req.body;
  if (!file) return res.status(400).json({ message: "Image is required" });

  const blog = await BlogModel.findById(data?._id);

  let uploadImage = await ImageUpload(file);

  if (blog?.image && blog?.image.length > 0) {
    await DeleteImage(blog?.image?.[0]?.image_id);
    uploadImage = await ImageUpload(file);
    blog.image = uploadImage;
    blog.alt = alt;
    blog.description = description;
    blog.title = title;
    blog.slug = slug;
    await blog.save();
    return res.status(200).json({ message: "Blog updated successfully" });
  }
});

export const getBlog = asyncHandler(async (req, res) => {
  const { query } = req;
  const limit = Number(query.limit) || 5;
  const index = Number(query.index) || 1;
  const newLimit = limit * index;

  const data = await BlogModel.find().sort({ _id: -1 }).limit(newLimit);
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

  if (find?.image && find?.image?.length > 0)
    await DeleteImage(find?.image?.[0]?.image_id);

  await BlogModel.findByIdAndDelete(find?._id);

  return res.status(200).json({ message: "Blog deleted successfully" });
});

export const deleteImageManual = asyncHandler(async (req, res) => {
  await DeleteImage(req.body.id);
});
