import { InnerBlogModel } from "../Model/InnerBlog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { DeleteImage, ImageUpload } from "../utils/ImageHandler.js";

const addBlog = asyncHandler(async (req, res) => {
    const data = req.body;
    const file = req.file
    let uploadImage;
    if (file) {
        uploadImage = await ImageUpload(file)
    }


    const NewBlog = await InnerBlogModel.create({ ...data, image: uploadImage })

    return res.status(200).json({ message: "Blog created successfully", data: NewBlog })
})

const updateInnerBlog = asyncHandler(async (req, res) => {
    const data = req.body
    const file = req.file

    let uploadImage;

    const find = await InnerBlogModel.findById(data?._id)


    if (!find) return res.status(400).json({ message: "Blog Not Found" })


    if (file) {
        if (find?.image && find?.image.length > 0) {
            console.log("case1")
            await DeleteImage(find?.image?.[0]?.image_id)
            uploadImage = await ImageUpload(file)
            await InnerBlogModel.findByIdAndUpdate({ _id: find?._id }, { ...data, image: uploadImage })
            return res.status(200).json({ message: "Blog and Image updated successfully" })
        } else {
            console.log("case2")
            uploadImage = await ImageUpload(file)
            await InnerBlogModel.findByIdAndUpdate({ _id: find?._id }, { ...data, image: uploadImage })
            return res.status(200).json({ message: "Blog and Image updated successfully" })
        }
    } else {
        if (data?.image && data?.image.trim() === "null" && find?.image?.[0]?.image_id) {
            console.log("case3")
            console.log(find?.image?.[0]?.image_id)
            let url = find?.image?.[0]?.image_id
            await DeleteImage(url)
            console.log("uploadImage", uploadImage)
            await InnerBlogModel.findByIdAndUpdate({ _id: find?._id }, { ...data, image: [] })
            return res.status(200).json({ message: "Blog and Image updated successfully" })
        } else {
            console.log("case4")
            await InnerBlogModel.findByIdAndUpdate({ _id: find?._id }, { ...data, image: uploadImage })
            return res.status(200).json({ message: "Blog updated successfully" })
        }
    }


})

const getInnerBlog = asyncHandler(async (req, res) => {
    const data = await InnerBlogModel.find({}).sort({ _id: -1 });
    if (data) {
        return res.status(200).json({ message: "Inner blog fetch successfully", data })
    }
    return res.status(400).json({ message: "failed to fetch blog" })
})



const deleteInnerBlog = asyncHandler(async (req, res) => {
    const data = req.body

    if (!data?._id) return res.status(400).json({ message: "incorrect InnerBlog id" })

    const find = await InnerBlogModel.findById(data?._id)

    if (!find) return res.status(400).json({ message: "Inner Blog do not exist" })

    if (find?.image && find?.image?.length > 0) await DeleteImage(find?.image?.[0]?.image_id)

    await InnerBlogModel.findByIdAndDelete(find?._id)

    return res.status(200).json({ message: "Inner Blog deleted successfully" })

})

export { addBlog, updateInnerBlog, deleteInnerBlog, getInnerBlog }
