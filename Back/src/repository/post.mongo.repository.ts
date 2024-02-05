import { Post, PostNoId } from "../entities/post.js";
import { HttpError } from "../types/http.error.js";
import { PostModel } from "./post.mongo.model.js";
import { Repository } from "./repository.js";

export class PostMongoRepository implements Repository<Post> {
  async getAll(): Promise<Post[]> {
    const data = await PostModel.find().exec();
    return data;
  }

  async get(id: string): Promise<Post> {
    const data = await PostModel.findById(id)
      .populate("author")
      .populate("likes")
      .exec();
    if (!data)
      throw new HttpError(404, "Not Found", "User not found in file system", {
        cause: "Trying getById",
      });
    return data;
  }

  async post(newData: PostNoId): Promise<Post> {
    const data = await PostModel.create(newData);
    return data;
  }

  async patch(id: string, newData: Partial<Post>): Promise<Post> {
    const data = await PostModel.findByIdAndUpdate(id, newData, {
      new: true,
    })
      .populate("author")
      .exec();
    if (!data)
      throw new HttpError(404, "Not Found", "User not found in file system", {
        cause: "Trying update",
      });
    console.log(data);
    return data;
  }

  async delete(id: string): Promise<void> {
    const result = await PostModel.findByIdAndDelete(id).exec();
    if (!result)
      throw new HttpError(404, "Not Found", "User not found in file system", {
        cause: "Trying delete",
      });
  }

  async search({
    key,
    value,
  }: {
    key: string;
    value: unknown;
  }): Promise<Post[]> {
    const data = await PostModel.find({ [key]: value })
      .populate("author")
      .populate("likes")
      .exec();
    return data;
  }
}
