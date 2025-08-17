import { PrismaClient } from "@prisma/client";

export class TaskService {
  constructor(private prisma: PrismaClient) {}

  listByOwner(ownerId: string) {
    return this.prisma.task.findMany({ where: { ownerId }, orderBy: { createdAt: "desc" } });
  }

  create(ownerId: string, data: { title: string }) {
    return this.prisma.task.create({ data: { title: data.title, ownerId } });
  }

  toggle(ownerId: string, id: string) {
    return this.prisma.task.update({ where: { id, ownerId }, data: { done: { set: true } } });
  }

  remove(ownerId: string, id: string) {
    return this.prisma.task.delete({ where: { id, ownerId } });
  }
}
