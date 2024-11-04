import mongoose from "mongoose";

mongoose.connect(`${process.env.MONGODBURL}`)

const portfolioSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description:{
            type:String,
            required:true
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

export const Portfolio = mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);

