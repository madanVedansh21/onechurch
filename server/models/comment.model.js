import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    body: {type: String, required: true},
    post: {type: mongoose.Schema.Types.ObjectId, ref:"Post", required: true},
    // we need to take care of commentedBy thing
});

const CommentModel = new mongoose.model("Comment", commentSchema);

export default CommentModel;