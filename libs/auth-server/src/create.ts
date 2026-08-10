import type { AuthBasePath, AuthBaseUrl } from "@repo/auth-core/schemas";
import type { Db } from "@repo/db/create";
import type { BetterAuthOptions } from "better-auth/minimal";

import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "@repo/auth-core/constants";
import {
  accountTable,
  sessionTable,
  verificationTable,
} from "@repo/db/schema/tables/auth";
import { userTable } from "@repo/db/schema/tables/user";
import { betterAuth } from "better-auth/minimal";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import type { AuthSecrets } from "@/env";

interface AuthServerParams {
  db: Db;
  baseURL: AuthBaseUrl;
  basePath: AuthBasePath;
  secrets: AuthSecrets;
}

function createSharedOptions({
  db,
  baseURL,
  basePath,
  secrets,
}: AuthServerParams) {
  return {
    baseURL,
    basePath,
    secrets,
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: {
        user: userTable,
        session: sessionTable,
        account: accountTable,
        verification: verificationTable,
      },
    }),
    advanced: {
      database: {
        generateId: false,
        joins: true,
      },
    },
    emailAndPassword: {
      enabled: true,
      minPasswordLength: MIN_PASSWORD_LENGTH,
      maxPasswordLength: MAX_PASSWORD_LENGTH,
    },
  } satisfies BetterAuthOptions;
}

export function createAuthServer({
  db,
  baseURL,
  basePath,
  secrets,
}: AuthServerParams) {
  return betterAuth(
    createSharedOptions({
      db,
      baseURL,
      basePath,
      secrets,
    }),
  );
}

export function createAppAuthServer({
  db,
  baseURL,
  basePath,
  secrets,
}: AuthServerParams) {
  const sharedOptions = createSharedOptions({
    db,
    baseURL,
    basePath,
    secrets,
  });

  return betterAuth({
    ...sharedOptions,
    // Better Auth docs specifies that the tanstackStartCookies plugin must come last in the array.
    plugins: [tanstackStartCookies()],
  });
}
