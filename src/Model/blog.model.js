import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    alt: {
      type: String,
      trim: true,
      required: true,
    },
    image: [
      {
        image_url: {
          type: String,
          trim: true,
          required: true,
        },
        image_id: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
    description: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const BlogModel = mongoose.model("Blog", BlogSchema);
