import { User, UserNoId } from "../entities/user.js";
import { HttpError } from "../types/http.error.js";
import { Repository } from "./repository.js";
import { UserModel } from "./user.mongo.model.js";

export class UserMongoRepository implements Repository<User> {
  async getAll(): Promise<User[]> {
    const data = await UserModel.find().exec();
    return data;
  }

  async get(id: string): Promise<User> {
    const data = await UserModel.findById(id)
      .populate("followers")
      .populate("followings")
      .exec();
    if (!data)
      throw new HttpError(404, "Not Found", "User not found in file system", {
        cause: "Trying getById",
      });
    return data;
  }

  async post(newData: UserNoId): Promise<User> {
    const data = await UserModel.create(newData);
    return data;
  }

  async patch(id: string, newData: Partial<User>): Promise<User> {
    const data = await UserModel.findByIdAndUpdate(id, newData, {
      new: true,
    }).exec();
    if (!data)
      throw new HttpError(404, "Not Found", "User not found in file system", {
        cause: "Trying update",
      });
    return data;
  }

  async delete(id: string): Promise<void> {
    const result = await UserModel.findByIdAndDelete(id).exec();
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
  }): Promise<User[]> {
    const data = await UserModel.find({ [key]: value })
      .populate("followers")
      .populate("followings")
      .exec();
    return data;
  }
}
