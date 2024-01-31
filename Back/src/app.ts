const Hapi = require("@hapi/hapi");

const server = Hapi.server({
  port: process.env.PORT || 3000,
});

const init = async () => {
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
