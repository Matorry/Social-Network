import { Server } from "@hapi/hapi";
import { PostController } from "../controllers/post.controller.js";
import { AuthInterceptor } from "../middleware/auth.interceptor.js";

export class PostRouter {
  private controller: PostController;
  private authInterceptor: AuthInterceptor;

  constructor(controller: PostController) {
    this.controller = controller;
    this.authInterceptor = new AuthInterceptor();
  }

  async configureRoutes(server: Server) {
    server.route({
      method: "POST",
      path: "/post/create",
      handler: this.controller.createPost.bind(this.controller),
      options: {
        pre: [
          { method: this.authInterceptor.authorization },
          { method: this.authInterceptor.authentication },
        ],
      },
    });

    server.route({
      method: "GET",
      path: "/post/get/{id}",
      handler: this.controller.getUserPost.bind(this.controller),
      options: {
        pre: [
          { method: this.authInterceptor.authorization },
          { method: this.authInterceptor.authentication },
        ],
      },
    });

    server.route({
      method: "GET",
      path: "/post/getbyid/{id}",
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
      path: "/post/delete/{id}",
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
      path: "/post/patch/{id}",
      handler: this.controller.patch.bind(this.controller),
      options: {
        pre: [
          { method: this.authInterceptor.authorization },
          { method: this.authInterceptor.authentication },
        ],
      },
    });

    server.route({
      method: "GET",
      path: "/post/search-post/{id}",
      handler: this.controller.getByUserAuthorFollowing.bind(this.controller),
      options: {
        pre: [
          { method: this.authInterceptor.authorization },
          { method: this.authInterceptor.authentication },
        ],
      },
    });
  }
}
