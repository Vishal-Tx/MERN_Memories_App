import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const commentSchema = new Schema({
  body: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  PostMessage: {
    type: Schema.Types.ObjectId,
    ref: "PostMessage",
  },
  commentDate: { type: Date, default: Date.now },
  likes: {
    type: [String],
    default: [],
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
