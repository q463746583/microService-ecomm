import request from "supertest";
import { app } from "../../app";

it("a new router for handling tickets", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("Only use sign in can access the ticket", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});
