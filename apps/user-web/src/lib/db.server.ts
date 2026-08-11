import { createDb } from "@repo/db/create";
import { DbEnvSchema } from "@repo/db/env";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { prettifyError } from "zod";

export const dbProviderMiddleware = createMiddleware().server(({ next }) => {
  const parseEnvResult = DbEnvSchema.safeParse(process.env);
  if (!parseEnvResult.success) {
    console.error(prettifyError(parseEnvResult.error));
    throw redirect({ to: "/500" });
  }
  const db = createDb(parseEnvResult.data.NEON_POOLED_CONNECTION_STRING);
  return next({ context: { db } });
});
