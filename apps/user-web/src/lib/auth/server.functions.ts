import { createServerFn } from "@tanstack/react-start";

import {
  authenticationMiddleware,
  authEnvProviderMiddleware,
} from "@/lib/auth/middlewares";

export const getAuthBaseRouteServerFn = createServerFn()
  .middleware([authEnvProviderMiddleware])
  .handler(({ context }) => {
    const { baseURL, basePath } = context;
    return { baseURL, basePath };
  });

export const getAuthInfoServerFn = createServerFn()
  .middleware([authenticationMiddleware])
  .handler(({ context }) => {
    const { baseURL, basePath, session, user } = context;
    return { baseURL, basePath, session, user };
  });
