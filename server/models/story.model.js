import mongoose from "mongoose"

const storySchema = new mongoose.Schema({
    resourceUrl: {type:String, required: true},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref:"Church"},
});

const StoryModel = new mongoose.model("Story", storySchema);