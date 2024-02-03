/* eslint-disable no-unused-vars */
import { Request, ResponseToolkit } from "@hapi/hapi";
import { LoginData, User, UserNoId } from "../entities/user.js";
import { UserMongoRepository } from "../repository/user.mongo.repository.js";
import { Auth, TokenPayload } from "../services/auth.js";
import { Controller } from "./controller.js";

export class UsersController extends Controller<User> {
  constructor(protected repo: UserMongoRepository) {
    super(repo);
  }

  async register(request: Request, response: ResponseToolkit) {
    try {
      let user = request.payload as UserNoId;
      user.passwd = await Auth.hash(user.passwd);

      user = await this.repo.post(user);
      return response.response(user).code(201);
    } catch (error) {
      return response.response({ error: "Internal Server Error" }).code(500);
    }
  }

  async login(request: Request, response: ResponseToolkit) {
    const { userName, passwd } = request.payload as LoginData;

    try {
      const data = await this.repo.search({ key: "userName", value: userName });
      if (!data.length) {
        return response.response({ error: "UnAuthorized" }).code(401);
      }

      const user = data[0];

      if (!(await Auth.compare(passwd, user.passwd))) {
        return response.response({ error: "Login unauthorized" }).code(401);
      }

      const payload: TokenPayload = {
        id: user.id,
        userName: user.userName,
      };

      const token = Auth.signToken(payload);

      return response.response({ user, token }).code(200);
    } catch (error) {
      return response.response({ error: "Internal Server Error" }).code(500);
    }
  }

  async getByUserName(request: Request, response: ResponseToolkit) {
    const { userName } = request.params;

    try {
      const users = await this.repo.search({
        key: "userName",
        value: userName,
      });

      if (users.length > 0) {
        return response.response(users[0]).code(200);
      }

      return response.response({ error: "Users not found" }).code(404);
    } catch (error) {
      return response.response({ error: "Internal Server Error" }).code(500);
    }
  }

  async follow(request: Request, response: ResponseToolkit) {
    try {
      const { id } = request.params;
      const currentUser = await this.repo.get(id);
      const newFollowingUserId = request.payload as string;
      const newFollowingUser = await this.repo.get(newFollowingUserId);
      if (
        !currentUser.followings.some(
          (user) => user.id === newFollowingUser.id,
        ) &&
        !newFollowingUser.followers.some((user) => user.id === currentUser.id)
      ) {
        currentUser.followings.push(newFollowingUser);

        newFollowingUser.followers.push(currentUser);
      }

      await this.repo.patch(currentUser.id, currentUser);
      await this.repo.patch(newFollowingUser.id, newFollowingUser);
      return response.response(currentUser).code(200);
    } catch (error) {
      return response.response({ error: "Internal Server Error" }).code(500);
    }
  }

  async unfollow(request: Request, response: ResponseToolkit) {
    try {
      const { id } = request.params;
      const currentUser = await this.repo.get(id);
      const unfollowUserId = request.payload as string;
      const unfollowUser = await this.repo.get(unfollowUserId);

      const indexInFollowings = currentUser.followings.findIndex(
        (user) => user.id === unfollowUser.id,
      );
      if (indexInFollowings !== -1) {
        currentUser.followings.splice(indexInFollowings, 1);
      }

      const indexInFollowers = unfollowUser.followers.findIndex(
        (user) => user.id === currentUser.id,
      );
      if (indexInFollowers !== -1) {
        unfollowUser.followers.splice(indexInFollowers, 1);
      }

      await this.repo.patch(currentUser.id, currentUser);
      await this.repo.patch(unfollowUser.id, unfollowUser);
      return response.response(currentUser).code(200);
    } catch (error) {
      return response.response({ error: "Internal Server Error" }).code(500);
    }
  }
}
