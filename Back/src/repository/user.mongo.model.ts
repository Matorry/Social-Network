import { Schema, model } from "mongoose";
import { User } from "../entities/user.js";

const userSchema = new Schema<User>({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwd: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },

  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  followings: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],

  isPublic: {
    type: Boolean,
    required: true,
  },
});

userSchema.set("toJSON", {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const UserModel = model("User", userSchema, "users");
