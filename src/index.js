const fastify = require("fastify")({ logger: true });
const blogsJson = require("./blogs.json");

// Declare a route
fastify.get("/sections", function handler(request, reply) {
  reply.send(blogsJson);
});

fastify.get(
  "/sections/:sectionId/blogs/:blogId",
  function handler(request, reply) {
    const section = blogsJson.sections.find(
      (section) => section.id === Number(request.params.sectionId)
    );

    if (section) {
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
    await fastify.listen({ port: 3000 });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})();
