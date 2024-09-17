import { ContactModel } from "../Model/contactUs.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createContactUs = asyncHandler(async (req, res) => {
    const data = req.body

    const create = await ContactModel.create({ ...data })
    if (!create) {
        return res.status(400).json({ message: "something went wrong while sending the message" })
    }

    return res.status(200).json({ data: create, message: "message sent successfully" })
})

const GetContactUs = asyncHandler(async (req, res) => {
    const { query } = req
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 5
    const newPage = limit * (page - 1)

    const data = await ContactModel.find({}).skip(newPage).limit(limit).sort({ _id: -1 });
    const count = await ContactModel.find({}).countDocuments()

    if (!data) return res.status(400).json({ message: "No data found" })

    return res.status(200).json({ data, count })
})

const deleteContactUs = asyncHandler(async (req, res) => {
    const data = req.body

    if (!data?._id === "") return res.status(400).json({ message: "id is required" })

    await ContactModel.findByIdAndDelete(data._id)

    return res.status(200).json({ message: "contact deleted successfully" })

})


export { createContactUs, GetContactUs, deleteContactUs }