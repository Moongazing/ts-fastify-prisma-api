import { FastifyInstance } from "fastify";
import { z } from "zod";
import { UserService } from "./user.service.js";

export default async function userController(app: FastifyInstance) {
  const service = new UserService(app.prisma);

  app.post("/auth/register", {
    schema: {
      body: z.object({
        email: z.string().email(),
        name: z.string().min(2),
        password: z.string().min(6),
      }).strict(),
      response: { 201: z.any() },
    },
    handler: async (req, reply) => {
      const body = req.body as any;
      const user = await service.register(body);
      reply.code(201).send({ id: user.id, email: user.email, name: user.name });
    },
  });

  app.post("/auth/login", {
    schema: {
      body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }).strict(),
    },
    handler: async (req, reply) => {
      const { email, password } = req.body as any;
      const user = await service.validateUser(email, password);
      if (!user) return reply.code(401).send({ message: "Invalid credentials" });

      const token = app.jwt.sign({ sub: user.id, role: user.role, email: user.email }, { expiresIn: "7d" });
      reply.send({ access_token: token });
    },
  });

  app.get("/users", { preHandler: app.requireAdmin }, async (_req, reply) => {
    const users = await service.list();
    reply.send(users);
  });
}
