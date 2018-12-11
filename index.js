const fastify = require("fastify")({
  logger: true
});

const mongoose = require("mongoose");
const routes = require("./routes");
const swagger = require("./config/swagger");

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

routes.forEach(route => {
  fastify.route(route);
});

fastify.register(require("fastify-swagger"), swagger.options);

const start = async () => {
  try {
    await fastify.listen(4000);
    fastify.swagger();
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
