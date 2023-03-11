import Fastify from "fastify";
import { deflateRaw } from "zlib";

async function buildServer() {
  const fastify = Fastify({
    logger: {
      transport: {
        target: "pino-pretty"
      }
    }
  });

  fastify.get("/", () => "Welcome")

  return fastify;
}

async function main() {
  const fastify = await buildServer();

  fastify.listen({
    port: 3000
  })
}

async function test() {
  const server = await buildServer();

  const response = await server.inject({
    method: "GET",
    url: "/"
  });

  console.log("status", response.statusCode);
  console.log("body", response.body)
}

test();
