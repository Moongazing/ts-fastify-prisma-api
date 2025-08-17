import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { env } from "../env.js";
import { FastifyReply, FastifyRequest } from "fastify";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: { sub: string; role: "USER" | "ADMIN"; email: string };
  }
}

export default fp(async (app) => {
  await app.register(jwt, { secret: env.jwtSecret });

  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch {
        reply.code(401).send({ message: "Unauthorized" });
      }
    },
  );

  app.decorate(
    "requireAdmin",
    async (request: FastifyRequest, reply: FastifyReply) => {
      await (app as any).authenticate(request, reply);
      if (request.user?.role !== "ADMIN") {
        reply.code(403).send({ message: "Forbidden" });
      }
    },
  );
});

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (req: FastifyRequest, rep: FastifyReply) => Promise<void>;
    requireAdmin: (req: FastifyRequest, rep: FastifyReply) => Promise<void>;
  }
}
