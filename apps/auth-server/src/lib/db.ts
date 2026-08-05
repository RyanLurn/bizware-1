import { createDb } from "@repo/db/create";

import { env } from "@/config/env";

export const db = createDb(env.NEON_POOLED_CONNECTION_STRING);
