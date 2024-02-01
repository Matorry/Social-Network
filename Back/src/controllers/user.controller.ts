/* eslint-disable no-unused-vars */
import Hapi from "@hapi/hapi";
import { LoginData, User, UserNoId } from "../entities/user.js";
import { UserMongoRepository } from "../repository/user.mongo.repository.js";
import { Auth, TokenPayload } from "../services/auth.js";
import { Controller } from "./controller.js";

export class UsersController extends Controller<User> {
  constructor(protected repo: UserMongoRepository) {
    super(repo);
  }

  async register(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      let user = request.payload as UserNoId;
      user.passwd = await Auth.hash(user.passwd);
      user = await this.repo.post(user);
      return h.response(user).code(201);
    } catch (error) {
      return h.response({ error: "Internal Server Error" }).code(500);
    }
  }

  async login(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { userName, passwd } = request.payload as LoginData;

    try {
      const data = await this.repo.search({ key: "userName", value: userName });
      if (!data.length) {
        return h.response({ error: "UnAuthorized" }).code(401);
      }

      const user = data[0];

      if (!(await Auth.compare(passwd, user.passwd))) {
        return h.response({ error: "Login unauthorized" }).code(401);
      }

      const payload: TokenPayload = {
        id: user.id,
        userName: user.userName,
      };

      const token = Auth.signToken(payload);

      return h.response({ user, token }).code(200);
    } catch (error) {
      return h.response({ error: "Internal Server Error" }).code(500);
    }
  }
}
