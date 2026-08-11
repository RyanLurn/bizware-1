import { createServerFn } from "@tanstack/react-start";

import {
  authenticationMiddleware,
  authEnvProviderMiddleware,
} from "@/lib/auth/middlewares.server";

export const getAuthBaseRouteServerFn = createServerFn()
  .middleware([authEnvProviderMiddleware])
  .handler(({ context }) => {
    const { baseURL, basePath } = context;
    return { baseURL, basePath };
  });

export const getUserServerFn = createServerFn()
  .middleware([authenticationMiddleware])
  .handler(({ context }) => {
    return context.user;
  });
