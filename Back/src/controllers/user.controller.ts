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
}
