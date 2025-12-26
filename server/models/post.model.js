import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    title: {type: String, rquired: true},
    likes: {type: Number},
    body: {type: String},
    resourceUrl: {type: String}, // images, videos, files
    comments: [{type: mongoose.Schema.Types.ObjectId, ref:"Comment"}],
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "Church"},
});

const PostSchema = new mongoose.Model("Post", postSchema);