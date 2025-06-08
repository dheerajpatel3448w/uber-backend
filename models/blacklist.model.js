import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400  // TTL: 24 hours in seconds
    }
});



export const Blacklist = mongoose.model("Blacklist", blacklistSchema)
