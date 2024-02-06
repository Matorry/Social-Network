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
      if (!author) {
        return response.response({ error: "Author not found" }).code(400);
      }

      newComment.author = author;

      newComment.date = new Date();

      const post = await this.postRepo.get(newComment.post.id);
      if (!post) {
        return response.response({ error: "Post not found" }).code(400);
      }

      newComment.post = post;

      const comment = await this.repo.post(newComment);

      return response.response(comment).code(201);
    } catch (error) {
      console.error("Error creating comment:", error);
      return response.response({ error: "Internal Server Error" }).code(500);
    }
  }

  async searchCommentByPost(request: Request, response: ResponseToolkit) {
    try {
      const { id } = request.params;

      const postComments = await this.repo.search({
        key: "post",
        value: id,
      });

      return response.response(postComments).code(200);
    } catch (error) {
      console.error("Error searching comments by post:", error);
      return response.response({ error: "Internal Server Error" }).code(500);
    }
  }
}
