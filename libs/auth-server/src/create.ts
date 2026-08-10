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

import type { AuthSecrets } from "@/env";

export function createAuthServer({
  db,
  baseURL,
  basePath,
  secrets,
  plugins,
}: {
  db: Db;
  baseURL: AuthBaseUrl;
  basePath: AuthBasePath;
  secrets: AuthSecrets;
  plugins?: BetterAuthOptions["plugins"];
}) {
  return betterAuth({
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
    plugins,
  });
}
