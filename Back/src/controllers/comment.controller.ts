/* eslint-disable no-unused-vars */
import { Request, ResponseToolkit } from "@hapi/hapi";
import { Comment, CommentNoId } from "../entities/comment.js";
import { CommentMongoRepository } from "../repository/comment.mongo.repository.js";
import { PostMongoRepository } from "../repository/post.mongo.repository.js";
import { UserMongoRepository } from "../repository/user.mongo.repository.js";
import { Controller } from "./controller.js";

export class CommentController extends Controller<Comment> {
  constructor(protected commentRepo: CommentMongoRepository) {
    super(commentRepo);
  }

  protected userRepo = new UserMongoRepository();

  protected postRepo = new PostMongoRepository();

  async createComment(request: Request, response: ResponseToolkit) {
    try {
      const newComment = request.payload as CommentNoId;
      const author = await this.userRepo.get(newComment.author.id);
      newComment.author = author;

      newComment.date = new Date();

      const post = await this.postRepo.get(newComment.post.id);
      newComment.post = post;

      const comment = await this.repo.post(request.payload as CommentNoId);

      return response.response(comment).code(201);
    } catch (error) {
      return response.response({ error: "Internal Server Error" }).code(500);
    }
  }
}
