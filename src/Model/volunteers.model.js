import mongoose, { Schema } from "mongoose";

const volunteersSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    languages: {
        type: String,
        required: true,
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
    image: {
        image_url: {
            type: String,
        },
        image_id: {
            type: String,
        },
    },
    time: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    howYouKnowUs: {
        type: String,
        required: true,
    },
    whyJoinUs: {
        type: String,
        required: true,
    },

}, { timestamps: true })


export const volunteersModel = mongoose.model("volunteer", volunteersSchema)