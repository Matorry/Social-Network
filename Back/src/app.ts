import Hapi from "@hapi/hapi";
import { UsersController } from "./controllers/user.controller.js";
import { dbConnect } from "./db/db.connect.js";
import { User } from "./entities/user.js";
import { Repository } from "./repository/repository.js";
import { UserMongoRepository } from "./repository/user.mongo.repository.js";
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

  await usersRoutes.configureRoutes(server);
  await server.start();
  console.log(`Server running on: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
