import { Hono } from "hono";

export const app = new Hono().get("/", (c) => {
  return c.text("Hello from Auth Server!");
});
