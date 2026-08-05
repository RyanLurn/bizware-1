import { defineRelations } from "drizzle-orm";

import {
  accountTable,
  sessionTable,
  verificationTable,
} from "@/schema/tables/auth";
import { userTable } from "@/schema/tables/user";

export const relations = defineRelations(
  {
    userTable,
    sessionTable,
    accountTable,
    verificationTable,
  },
  ({ many, one, userTable, sessionTable, accountTable }) => ({
    userTable: {
      sessions: many.sessionTable({
        from: userTable.id,
        to: sessionTable.userId,
      }),
      accounts: many.accountTable({
        from: userTable.id,
        to: accountTable.userId,
      }),
    },
    sessionTable: {
      user: one.userTable({
        from: sessionTable.userId,
        to: userTable.id,
      }),
    },
    accountTable: {
      user: one.userTable({
        from: sessionTable.userId,
        to: userTable.id,
      }),
    },
  }),
);
