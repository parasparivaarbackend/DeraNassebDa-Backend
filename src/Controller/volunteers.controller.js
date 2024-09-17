import { volunteersModel } from "../Model/volunteers.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ImageUpload } from "../utils/ImageHandler.js";


const createvolunteers = asyncHandler(async (req, res) => {
    const data = req.body
    const file = req.file
    if (!file) return res.status(400).json({ message: "image is required" })

    const imageData = await ImageUpload(file)
    if (!imageData) return res.status(500).json({ message: "failed to upload image" })

    const create = await volunteersModel.create({ ...data, image: imageData })

    if (!create) return res.status(500).json({ message: 'failed to create volunteer' })

    return res.status(200).json({ data: create, message: 'volunteer created successfully' })

})


const getAllVolunteers = asyncHandler(async (req, res) => {
    const { query } = req
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 5
    const newLimit = limit * (page - 1)

    const data = await volunteersModel.find({}).skip(newLimit).limit(limit).sort({ _id: -1 });
    const count = await volunteersModel.find({}).countDocuments()
    if (!count) return res.status(400).json({ message: "No volunteer found" })



    return res.status(200).json({ data, count, message: "All volunteer fetch successfully" })
})


const deleteVolunteer = asyncHandler(async (req, res) => {
    const data = req.body

    if (data?._id === "") return res.status(400).json({ message: "id is required" })

    await volunteersModel.findByIdAndDelete(data?._id)

    return res.status(200).json({ message: "volunteer deleted successfully" })





})


export { createvolunteers, getAllVolunteers, deleteVolunteer }
