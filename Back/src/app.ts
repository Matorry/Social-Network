import Hapi from "@hapi/hapi";
import { dbConnect } from "./db/db.connect.js";

const init = async () => {
  await dbConnect();

  const server = new Hapi.Server({
    port: 3000,
    host: "localhost",
  });
  await server.start();
  console.log(`Server running on: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
