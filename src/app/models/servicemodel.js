import mongoose from "mongoose";

mongoose.connect(`${process.env.MONGODBURL}`)

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        coverImage: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

export const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);

