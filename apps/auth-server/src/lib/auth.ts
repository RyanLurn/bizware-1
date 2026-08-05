import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import {
  accountTable,
  sessionTable,
  verificationTable,
} from "@repo/db/schema/tables/auth";
import { userTable } from "@repo/db/schema/tables/user";
import { betterAuth } from "better-auth/minimal";

import { db } from "@/lib/db";

export const auth = betterAuth({
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
  },
});
