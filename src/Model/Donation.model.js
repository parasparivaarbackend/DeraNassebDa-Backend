import mongoose, { Schema } from "mongoose";

const DonationSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    DonationFor: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true

    },
    AadharNumber: {
        type: String,
        required: true,
        trim: true
    },
    PanNumber: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    RazorPayOrderId: {
        type: String,
        required: true
    },
    RazorPayPaymentId: {
        type: String,
    }
}, { timestamps: true })


export const DonationModel = mongoose.model("Donation", DonationSchema)