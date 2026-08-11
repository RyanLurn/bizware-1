import { createFileRoute } from "@tanstack/react-router";

import { authProviderMiddleware } from "@/lib/auth/middlewares.server";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    middleware: [authProviderMiddleware],
    handlers: {
      GET: async ({ request, context }) => {
        return await context.auth.handler(request);
      },
      POST: async ({ request, context }) => {
        return await context.auth.handler(request);
      },
    },
  },
});
