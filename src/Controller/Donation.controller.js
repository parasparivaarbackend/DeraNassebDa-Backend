import Razorpay from "razorpay";
import { asyncHandler } from "../utils/asyncHandler.js";
import { DonationModel } from "../Model/Donation.model.js";
import dotenv from "dotenv";
dotenv.config();

let razorpay = new Razorpay({
    key_id: process.env.PAYMENT_KEY_ID,
    key_secret: process.env.PAYMENT_KEY_SECRET
})


const payment = asyncHandler(async (req, res) => {
    const data = req.body;
    console.log("data", data)
    console.log("amount", data?.amount)
    try {

        const options = {
            payment_capture: 1,
            amount: data?.amount * 100,
            currency: "INR",
            receipt: "abc@gmail.com",
        }
        razorpay.orders.create(options, (err, order) => {
            if (err) {
                console.log(err)
            } else {
                console.log(order)
                return res.status(200).json({
                    amount: order.amount,
                    currency: order.currency,
                    id: order.id,
                })
            }

        })
    } catch (error) { }
})


const createDonation = asyncHandler(async (req, res) => {
    const data = req.body

    const create = await DonationModel.create({ ...data })
    if (!create) return res.status(400).json({ message: "something went wrong" })

    return res.status(200).json({ data: create })
})

const GetDonation = asyncHandler(async (req, res) => {
    const { query } = req
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 5
    const newPage = limit * (page - 1)

    const donation = await DonationModel.find({}).skip(newPage).limit(limit).sort({ _id: -1 });
    const count = await DonationModel.find({}).countDocuments()

    if (count === 0) return res.status(200).json({ message: "No donation yet" })

    return res.status(200).json({ donation, count })
})

const FeatureDonation = asyncHandler(async (req, res) => {

    const donation = await DonationModel.find({ amount: { $gt: 49999 } }).sort({ _id: -1 })

    if (!donation && donation?.length === 0) return res.status(200).json({ message: "No such donation above 49999" })

    return res.status(200).json({ data: donation })
})






export { payment, createDonation, GetDonation, FeatureDonation }