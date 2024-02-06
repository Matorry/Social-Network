import { Schema, model } from "mongoose";
import { Comment } from "../entities/comment.js";

const commentSchema = new Schema<Comment>({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

commentSchema.set("toJSON", {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const CommentModel = model("Comment", commentSchema, "comments");
