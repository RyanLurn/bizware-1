import { Hono } from "hono";
import { cors } from "hono/cors";

import { auth } from "@/lib/auth";

export const app = new Hono()
  .use(
    "*",
    cors({
      origin: "http://localhost:5173",
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  )
  .get("/", (c) => {
    return c.text("Hello from Auth Server!");
  })
  .on(["GET", "POST"], "/api/auth/*", (c) => auth.handler(c.req.raw));
