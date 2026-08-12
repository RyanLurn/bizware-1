import type { AuthBasePath, AuthBaseUrl } from "@repo/auth-core/schemas";
import type { ValidateRedirectOptions } from "@tanstack/react-router";

import { createAuthServerOptions } from "@repo/auth-server/create";
import { AuthServerEnvSchema } from "@repo/auth-server/env";
import { dbProviderMiddleware } from "@repo/db-tanstack-start";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { betterAuth } from "better-auth/minimal";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export function authProviderMiddleware({
  baseURL,
  basePath,
  onErrorRedirectOptions,
}: {
  baseURL: AuthBaseUrl;
  basePath: AuthBasePath;
  onErrorRedirectOptions: ValidateRedirectOptions;
}) {
  return createMiddleware()
    .middleware([dbProviderMiddleware(onErrorRedirectOptions)])
    .server(({ next, context }) => {
      // Get secrets string from env
      const parseEnvResult = AuthServerEnvSchema.safeParse(process.env);
      if (!parseEnvResult.success) {
        console.error(parseEnvResult.error.issues);
        throw redirect(onErrorRedirectOptions);
      }

      // Create shared auth server options
      const sharedOptions = createAuthServerOptions({
        db: context.db,
        baseURL,
        basePath,
        secrets: parseEnvResult.data.AUTH_SECRETS,
      });

      // Create auth server instance specific to TanStack Start
      const auth = betterAuth({
        ...sharedOptions,
        plugins: [tanstackStartCookies()],
      });

      // Pass the instance to the next middleware/function in the chain
      return next({ context: { auth } });
    });
}

export function authSessionProviderMiddleware({
  baseURL,
  basePath,
  onInternalErrorRedirectOptions,
  onUnauthenticatedErrorRedirectOptions,
}: {
  baseURL: AuthBaseUrl;
  basePath: AuthBasePath;
  onInternalErrorRedirectOptions: ValidateRedirectOptions;
  onUnauthenticatedErrorRedirectOptions: ValidateRedirectOptions;
}) {
  return createMiddleware()
    .middleware([
      authProviderMiddleware({
        baseURL,
        basePath,
        onErrorRedirectOptions: onInternalErrorRedirectOptions,
      }),
    ])
    .server(async ({ next, context, request }) => {
      try {
        const getSessionResult = await context.auth.api.getSession({
          headers: request.headers,
        });
        if (getSessionResult === null) {
          throw redirect(onUnauthenticatedErrorRedirectOptions);
        }
        const { session, user } = getSessionResult;
        return next({ context: { session, user } });
      } catch (error) {
        console.error(error);
        throw redirect(onInternalErrorRedirectOptions);
      }
    });
}
