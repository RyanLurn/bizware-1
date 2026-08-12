import type { ValidateRedirectOptions } from "@tanstack/react-router";

import { createDb } from "@repo/db-driver";
import { DbEnvSchema } from "@repo/db-driver/env";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";

export function dbProviderMiddleware(
  onErrorRedirectOptions: ValidateRedirectOptions,
) {
  return createMiddleware().server(({ next }) => {
    const parseEnvResult = DbEnvSchema.safeParse(process.env);
    if (!parseEnvResult.success) {
      console.error(parseEnvResult.error.issues);
      throw redirect(onErrorRedirectOptions);
    }
    const db = createDb(parseEnvResult.data.NEON_POOLED_CONNECTION_STRING);
    return next({ context: { db } });
  });
}
