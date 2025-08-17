import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/crypto.js";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@example.com";
  const exists = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!exists) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: "Admin",
        password: await hashPassword("admin123"),
        role: "ADMIN",
      },
    });
  }
  console.log("Seed complete");
}

main().finally(() => prisma.$disconnect());
