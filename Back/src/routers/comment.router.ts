import { Server } from "@hapi/hapi";
import { CommentController } from "../controllers/comment.controller.js";
import { AuthInterceptor } from "../middleware/auth.interceptor.js";

export class CommentRouter {
  private controller: CommentController;
  private authInterceptor: AuthInterceptor;

  constructor(controller: CommentController) {
    this.controller = controller;
    this.authInterceptor = new AuthInterceptor();
  }

  async configureRoutes(server: Server) {
    server.route({
      method: "POST",
      path: "/comment/create",
      handler: this.controller.createComment.bind(this.controller),
      options: {
        pre: [
          { method: this.authInterceptor.authorization },
          { method: this.authInterceptor.authentication },
        ],
      },
    });

    server.route({
      method: "GET",
      path: "/comment/search/{id}",
      handler: this.controller.searchCommentByPost.bind(this.controller),
      options: {
        pre: [
          { method: this.authInterceptor.authorization },
          { method: this.authInterceptor.authentication },
        ],
      },
    });
  }
}
