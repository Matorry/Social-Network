import { Server } from "@hapi/hapi";
import { UsersController } from "../controllers/user.controller.js";
import { AuthInterceptor } from "../middleware/auth.interceptor.js";

export class UsersRouter {
  private controller: UsersController;
  private authInterceptor: AuthInterceptor;

  constructor(controller: UsersController) {
    this.controller = controller;
    this.authInterceptor = new AuthInterceptor();
  }

  async configureRoutes(server: Server) {
    server.route({
      method: "PATCH",
      path: "/login",
      handler: this.controller.login.bind(this.controller),
    });

    server.route({
      method: "POST",
      path: "/register",
      handler: this.controller.register.bind(this.controller),
    });

    server.route({
      method: "GET",
      path: "/user/search/{userName}",
      handler: this.controller.getByUserName.bind(this.controller),
      options: {
        pre: [
          { method: this.authInterceptor.authorization },
          { method: this.authInterceptor.authentication },
        ],
      },
    });

    server.route({
      method: "GET",
      path: "/user/",
      handler: this.controller.getAll.bind(this.controller),
      options: {
        pre: [
          { method: this.authInterceptor.authorization },
          { method: this.authInterceptor.authentication },
        ],
      },
    });

    server.route({
      method: "GET",
      path: "/user/{id}",
      handler: this.controller.get.bind(this.controller),
      options: {
        pre: [
          { method: this.authInterceptor.authorization },
          { method: this.authInterceptor.authentication },
        ],
      },
    });

    server.route({
      method: "DELETE",
      path: "/user/delete/{id}",
      handler: this.controller.delete.bind(this.controller),
      options: {
        pre: [
          { method: this.authInterceptor.authorization },
          { method: this.authInterceptor.authentication },
        ],
      },
    });

    server.route({
      method: "PATCH",
      path: "/user/patch/{id}",
      handler: this.controller.patch.bind(this.controller),
      options: {
        pre: [
          { method: this.authInterceptor.authorization },
          { method: this.authInterceptor.authentication },
        ],
      },
    });

    server.route({
      method: "PATCH",
      path: "/user/follow/{id}",
      handler: this.controller.follow.bind(this.controller),
      options: {
        pre: [
          { method: this.authInterceptor.authorization },
          { method: this.authInterceptor.authentication },
        ],
      },
    });

    server.route({
      method: "PATCH",
      path: "/user/unfollow/{id}",
      handler: this.controller.unfollow.bind(this.controller),
      options: {
        pre: [
          { method: this.authInterceptor.authorization },
          { method: this.authInterceptor.authentication },
        ],
      },
    });
  }
}
