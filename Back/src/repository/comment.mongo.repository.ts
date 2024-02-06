import { Comment, CommentNoId } from "../entities/comment.js";
import { HttpError } from "../types/http.error.js";
import { CommentModel } from "./comment.mongo.model.js";
import { Repository } from "./repository.js";

export class CommentMongoRepository implements Repository<Comment> {
  async getAll(): Promise<Comment[]> {
    const data = await CommentModel.find().exec();
    return data;
  }

  async get(id: string): Promise<Comment> {
    const data = await CommentModel.findById(id).populate("author").exec();
    if (!data)
      throw new HttpError(404, "Not Found", "User not found in file system", {
        cause: "Trying getById",
      });
    return data;
  }

  async post(newData: CommentNoId): Promise<Comment> {
    const data = await CommentModel.create(newData);
    return data;
  }

  async patch(id: string, newData: Partial<Comment>): Promise<Comment> {
    const data = await CommentModel.findByIdAndUpdate(id, newData, {
      new: true,
    })
      .populate("author")
      .exec();
    if (!data)
      throw new HttpError(404, "Not Found", "User not found in file system", {
        cause: "Trying update",
      });
    return data;
  }

  async delete(id: string): Promise<void> {
    const result = await CommentModel.findByIdAndDelete(id).exec();
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
  }): Promise<Comment[]> {
    const data = await CommentModel.find({ [key]: value })
      .populate("author")
      .exec();
    return data;
  }
}
