import {
  accountTable,
  sessionTable,
  verificationTable,
} from "@repo/db-tables/auth";
import { userTable } from "@repo/db-tables/user";
import { defineRelations } from "drizzle-orm";

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
        from: accountTable.userId,
        to: userTable.id,
      }),
    },
  }),
);
