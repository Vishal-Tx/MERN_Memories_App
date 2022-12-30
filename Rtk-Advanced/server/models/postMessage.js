import mongoose from "mongoose";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// let Comments = require("./comment").schema;
// import Comment, { commentSchema } from "./comment.js";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
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

const postSchema = new Schema({
  title: String,
  message: String,
  // creator: String,
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  // comments: [
  //   {
  //     commentCreator: { type: String },
  //     commentBody: { type: String },
  //     commentDate: { type: Date, default: Date.now },
  //     likes: {
  //       type: [String],
  //       default: [],
  //     },
  //   },
  // ],
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
});

postSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    //   for (rev of doc.reviews) {
    //     await review.deleteMany({
    //       _id: {
    //         $in: rev,
    //       },
    //     });
    //   }
    // }
    // console.log("deleted log");
    // console.log("comment", commentSchema);
  }
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
