import Fastify from "fastify";
import sensible from "@fastify/sensible";
import cors from "@fastify/cors";
import prismaPlugin from "./plugins/prisma.js";
import authPlugin from "./plugins/auth.js";
import userRoutes from "./modules/users/user.routes.js";
import taskRoutes from "./modules/tasks/task.routes";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(sensible);
  app.register(cors, { origin: true }); 

  app.register(prismaPlugin);
  app.register(authPlugin);

  app.get("/health", async () => ({ ok: true }));

  app.register(userRoutes);
  app.register(taskRoutes);

  return app;
}
