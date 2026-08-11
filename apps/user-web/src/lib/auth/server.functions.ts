import { createServerFn } from "@tanstack/react-start";

import { authenticationMiddleware } from "@/lib/auth/middlewares.server";

export const getUserServerFn = createServerFn()
  .middleware([authenticationMiddleware])
  .handler(({ context }) => {
    return context.user;
  });
