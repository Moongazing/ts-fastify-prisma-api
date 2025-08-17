import { FastifyInstance } from "fastify";
import controller from "./user.controller.js";

export default async function userRoutes(app: FastifyInstance) {
  await controller(app);
}
