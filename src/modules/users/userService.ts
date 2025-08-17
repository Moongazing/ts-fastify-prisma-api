import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword } from "../../utils/crypto.js";

export class UserService {
  constructor(private prisma: PrismaClient) {}

  async register(data: { email: string; name: string; password: string }) {
    const password = await hashPassword(data.password);
    return this.prisma.user.create({ data: { ...data, password } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const ok = await comparePassword(password, user.password);
    if (!ok) return null;
    return user;
  }

  async list() {
    return this.prisma.user.findMany({ select: { id: true, email: true, name: true, role: true } });
  }
}
