import "fastify";
declare module "fastify" {
  interface FastifyRequest {
    user?: { sub: string; role: "USER" | "ADMIN"; email: string };
  }
}
