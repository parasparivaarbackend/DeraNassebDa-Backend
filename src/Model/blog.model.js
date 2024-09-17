import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      trim: true,
      required: true
    },
    slug: {
      type: String,
      trim: true,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

export const BlogModel = mongoose.model("Blog", BlogSchema)



// subtitle: [
//   {
//     sub_title: {
//       type: String,
//       trim: true,
//     }
//   },
// ],
// description: [
//   {
//     des: {
//       type: String,
//       trim: true,
//       required: true
//     }
//   }
// ],

// image: [ImagesSchema],

// videoLink: [
//   {
//     link: {
//       type: String,
//       trim: true,
//     }
//   }
// ]




// blogData: [
//   {
//     subTitle: {
//       type: String,
//       trim: true,

//     },
//     description: {
//       type: String,
//       trim: true,

//     },
//     image: {
//       type: ImagesSchema,
//     },
//     alt: {
//       type: String,
//       trim: true,
//     },
//     link: {
//       type: String,
//       trim: true,
//     },
//     iframe: {
//       type: String,
//       trim: true,
//     }

//   }
// ],