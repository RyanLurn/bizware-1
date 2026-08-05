import { Hono } from "hono";

import { auth } from "@/lib/auth";

export const app = new Hono()
  .get("/", (c) => {
    return c.text("Hello from Auth Server!");
  })
  .on(["GET", "POST"], "/api/auth/*", (c) => auth.handler(c.req.raw));
