const fastify = require("fastify")({ logger: true });
const blogsJson = require("./blogs.json");

const port = 3000;
// Declare a route
fastify.get("/sections", function handler(request, reply) {
  reply.send(blogsJson);
});

fastify.get("/", function handler(request, reply) {
  reply.code(200).send({ hello: "ok" });
});

fastify.get(
  "/sections/:sectionId/blogs/:blogId",
  function handler(request, reply) {
    const section = blogsJson.sections.find(
      (section) => section.id === Number(request.params.sectionId)
    );

    if (!section) {
      return reply.code(404).send(new Error("Section not found"));
    }

    const blog = section.blogs.find(
      (blog) => blog.id === Number(request.params.blogId)
    );
    if (!blog) {
      return reply.code(404).send(new Error("Blog not found"));
    }

    reply.send({ blog });
  }
);

(async () => {
  try {
    await fastify.listen({ port, host: "0.0.0.0" });
    console.log("listening on port " + port);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})();
