import { FastifyInstance } from "fastify";
import { z } from "zod";
import { TaskService } from "./task.service.js";

const createBody = z.object({ title: z.string().min(1) }).strict();
const idParam = z.object({ id: z.string().cuid() });

export default async function taskController(app: FastifyInstance) {
  const service = new TaskService(app.prisma);

  app.get("/tasks", { preHandler: app.authenticate }, async (req, reply) => {
    const ownerId = req.user!.sub;
    const tasks = await service.listByOwner(ownerId);
    reply.send(tasks);
  });

  app.post("/tasks", { preHandler: app.authenticate, schema: { body: createBody } }, async (req, reply) => {
    const ownerId = req.user!.sub;
    const task = await service.create(ownerId, createBody.parse(req.body));
    reply.code(201).send(task);
  });

  app.post("/tasks/:id/done", { preHandler: app.authenticate }, async (req, reply) => {
    const ownerId = req.user!.sub;
    const { id } = idParam.parse(req.params);
    const updated = await service.toggle(ownerId, id);
    reply.send(updated);
  });

  app.delete("/tasks/:id", { preHandler: app.authenticate }, async (req, reply) => {
    const ownerId = req.user!.sub;
    const { id } = idParam.parse(req.params);
    await service.remove(ownerId, id);
    reply.code(204).send();
  });
}
