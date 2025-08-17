import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "./helpers.js";

let token = "";

describe("API", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("health ok", async () => {
    const res = await request(app.server).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it("register + login", async () => {
    const email = `user${Date.now()}@example.com`;
    await request(app.server).post("/auth/register").send({
      email,
      name: "User",
      password: "secret123",
    }).expect(201);

    const login = await request(app.server).post("/auth/login").send({
      email,
      password: "secret123",
    }).expect(200);

    expect(login.body.access_token).toBeDefined();
    token = login.body.access_token;
  });

  it("task flow", async () => {
    const create = await request(app.server)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Learn Fastify" })
      .expect(201);

    const list = await request(app.server)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(list.body.length).toBeGreaterThan(0);

    await request(app.server)
      .post(`/tasks/${create.body.id}/done`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
