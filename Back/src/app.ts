import Hapi from "@hapi/hapi";
import { Server } from "socket.io";
import { CommentController } from "./controllers/comment.controller.js";
import { PostController } from "./controllers/post.controller.js";
import { UsersController } from "./controllers/user.controller.js";
import { dbConnect } from "./db/db.connect.js";
import { Comment } from "./entities/comment.js";
import { Post } from "./entities/post.js";
import { User } from "./entities/user.js";
import { CommentMongoRepository } from "./repository/comment.mongo.repository.js";
import { PostMongoRepository } from "./repository/post.mongo.repository.js";
import { Repository } from "./repository/repository.js";
import { UserMongoRepository } from "./repository/user.mongo.repository.js";
import { CommentRouter } from "./routers/comment.router.js";
import { PostRouter } from "./routers/post.router.js";
import { UsersRouter } from "./routers/user.router.js";

const server = new Hapi.Server({
  port: 3000,
  host: "localhost",
  routes: {
    cors: {},
  },
});

const init = async () => {
  await dbConnect();

  const userRepo: Repository<User> = new UserMongoRepository();
  const usersController = new UsersController(userRepo);
  const usersRoutes = new UsersRouter(usersController);

  const postRepo: Repository<Post> = new PostMongoRepository();
  const postController = new PostController(postRepo);
  const postRoutes = new PostRouter(postController);

  const commentRepo: Repository<Comment> = new CommentMongoRepository();
  const commentController = new CommentController(commentRepo);
  const commentRoutes = new CommentRouter(commentController);

  await usersRoutes.configureRoutes(server);
  await postRoutes.configureRoutes(server);
  await commentRoutes.configureRoutes(server);

  await server.start();
  console.log(`Server running on: ${server.info.uri}`);

  const io = new Server(server.listener, {
    cors: {},
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("chat:message", ({ userName, message }) => {
      io.emit("chat:message", { user: userName, text: message });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
