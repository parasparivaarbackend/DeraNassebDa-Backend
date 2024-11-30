// import mongoose, { Schema } from "mongoose";


// const InnerBlog = new Schema({
//     blogId: {
//         type: Schema.Types.ObjectId,
//         ref: "Blog",
//         required: true
//     },
//     subTitle: {
//         type: String,
//         trim: true
//     },
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },

//     alt: {
//         type: String,
//         trim: true
//     },
//     link: {
//         type: String,
//         trim: true
//     },
//     iframe: {
//         type: String,
//     },
//     image: [{
//         image_url: {
//             type: String,
//         },
//         image_id: {
//             type: String,
//         }
//     }],


// }, { timestamps: true })

// export const InnerBlogModel = mongoose.model("InnerBlog", InnerBlog)