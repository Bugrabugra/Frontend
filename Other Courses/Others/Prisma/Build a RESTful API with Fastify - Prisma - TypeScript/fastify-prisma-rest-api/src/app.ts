import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/user.route";
import productRoutes from "./modules/product/product.route";
import { userSchemas } from "./modules/user/user.schema";
import { productSchemas } from "./modules/product/product.schema";
import fjwt, {JWT} from "@fastify/jwt";


export const server = Fastify();

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    }
  }
}

async function main() {
  server.register(fjwt, {
    secret: "dksfshdfshkdfkwuerdkdfkh"
  });

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch(error) {
        return reply.send(error);
      }
    }
    )

  server.get("/healthcheck", async function () {
    return {status: "OK"};
  });

  server.addHook("preHandler", (req, reply, next) => {
    req.jwt = server.jwt;
    return next();
  })

  for (const schema of [...userSchemas, ...productSchemas]) {
    server.addSchema(schema);
  }

  server.register(userRoutes, {prefix: "api/users"});
  server.register(productRoutes, {prefix: "api/products"});

  try {
    await server.listen(3000, "localhost");
    console.log(`Server ready at http://localhost:3000`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
