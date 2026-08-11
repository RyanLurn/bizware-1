import type { AppAuthServer } from "@repo/auth-server/types";
import type { Db } from "@repo/db/create";

import { createAppAuthServer } from "@repo/auth-server/create";
import { createDb } from "@repo/db/create";
import { HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD } from "@repo/http-consts/response-statuses";
import handler, { createServerEntry } from "@tanstack/react-start/server-entry";
import { prettifyError } from "zod";

import type { ServerEnv } from "@/config/env";

import { ServerEnvSchema } from "@/config/env";

type AppRequestContext = {
  env: ServerEnv;
  db: Db;
  auth: AppAuthServer;
};

declare module "@tanstack/react-router" {
  interface Register {
    server: {
      requestContext: AppRequestContext;
    };
  }
}

export default createServerEntry({
  async fetch(request) {
    const parseEnvResult = ServerEnvSchema.safeParse(process.env);
    if (!parseEnvResult.success) {
      console.error(prettifyError(parseEnvResult.error));
      return new Response(null, {
        status:
          HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD.INTERNAL_SERVER_ERROR.code,
        statusText:
          HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD.INTERNAL_SERVER_ERROR.text,
      });
    }
    const env = parseEnvResult.data;

    const db = createDb(env.NEON_POOLED_CONNECTION_STRING);

    const auth = createAppAuthServer({
      db,
      baseURL: env.AUTH_BASE_URL,
      basePath: env.AUTH_BASE_PATH,
      secrets: env.AUTH_SECRETS,
    });

    return handler.fetch(request, { context: { env, db, auth } });
  },
});
