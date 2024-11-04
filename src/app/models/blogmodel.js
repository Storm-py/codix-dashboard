import mongoose from "mongoose";

mongoose.connect(`${process.env.MONGODBURL}`)

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        coverImage: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
