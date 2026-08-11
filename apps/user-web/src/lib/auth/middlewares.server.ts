import { createAppAuthServer } from "@repo/auth-server/create";
import { AuthServerEnvSchema } from "@repo/auth-server/env";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { prettifyError } from "zod";

import { dbProviderMiddleware } from "@/lib/db.server";

export const authEnvProviderMiddleware = createMiddleware().server(
  ({ next }) => {
    const parseEnvResult = AuthServerEnvSchema.safeParse(process.env);
    if (!parseEnvResult.success) {
      console.error(prettifyError(parseEnvResult.error));
      throw redirect({ to: "/500" });
    }
    const { AUTH_BASE_URL, AUTH_BASE_PATH, AUTH_SECRETS } = parseEnvResult.data;
    return next({
      context: {
        baseURL: AUTH_BASE_URL,
        basePath: AUTH_BASE_PATH,
        secrets: AUTH_SECRETS,
      },
    });
  },
);

export const authProviderMiddleware = createMiddleware()
  .middleware([dbProviderMiddleware, authEnvProviderMiddleware])
  .server(({ next, context }) => {
    const { db, baseURL, basePath, secrets } = context;
    const auth = createAppAuthServer({ db, baseURL, basePath, secrets });
    return next({ context: { auth } });
  });

export const authenticationMiddleware = createMiddleware()
  .middleware([authProviderMiddleware])
  .server(async ({ next, context, request }) => {
    const getSessionResult = await context.auth.api.getSession({
      headers: request.headers,
    });
    if (getSessionResult === null) {
      throw redirect({ to: "/sign-in" });
    }
    const { session, user } = getSessionResult;
    return next({ context: { session, user } });
  });
