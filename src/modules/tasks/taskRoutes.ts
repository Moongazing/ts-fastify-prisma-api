import { FastifyInstance } from "fastify";
import controller from "./taskController";
export default async function taskRoutes(app: FastifyInstance) {
  await controller(app);
}
