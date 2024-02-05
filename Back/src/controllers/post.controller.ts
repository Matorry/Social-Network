/* eslint-disable no-unused-vars */
import { Request, ResponseToolkit } from "@hapi/hapi";
import { Post, PostNoId } from "../entities/post.js";
import { PostMongoRepository } from "../repository/post.mongo.repository.js";
import { UserMongoRepository } from "../repository/user.mongo.repository.js";
import { Controller } from "./controller.js";

export class PostController extends Controller<Post> {
  constructor(protected postRepo: PostMongoRepository) {
    super(postRepo);
  }

  protected userRepo = new UserMongoRepository();

  async createPost(request: Request, response: ResponseToolkit) {
    try {
      const newPost = request.payload as Post;
      const author = await this.userRepo.get(newPost.author.id);
      newPost.author = author;
      newPost.date = new Date();
      const post = await this.repo.post(request.payload as PostNoId);
      return response.response(post).code(201);
    } catch (error) {
      return response.response({ error: "Internal Server Error" }).code(500);
    }
  }

  async getUserPost(request: Request, response: ResponseToolkit) {
    try {
      const { id } = request.params;
      const author = await this.userRepo.get(id);
      console.log(author);
      const posts = await this.postRepo.search({
        key: "author",
        value: author,
      });
      return response.response(posts).code(200);
    } catch (error) {
      return response.response({ error: "Internal Server Error" }).code(500);
    }
  }
}
