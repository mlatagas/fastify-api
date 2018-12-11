const fastify = require("fastify")({
  logger: true
});

const mongoose = require("mongoose");
const routes = require("./routes");

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

routes.forEach(route => {
  fastify.route(route);
});

const start = async () => {
  try {
    await fastify.listen(4000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

mongoose
  .connect("mongodb://localhost/mycargarage")
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));
