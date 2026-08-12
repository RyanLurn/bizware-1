import { neon } from "@neondatabase/serverless";
import { relations } from "@repo/db-relations";
import { drizzle } from "drizzle-orm/neon-http";

import type { NeonPooledConnectionString } from "@/env";

export function createDb(connectionString: NeonPooledConnectionString) {
  const client = neon(connectionString);
  const db = drizzle({ client, relations });
  return db;
}

export type Db = ReturnType<typeof createDb>;
