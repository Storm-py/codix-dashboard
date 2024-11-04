import mongoose from "mongoose";

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

