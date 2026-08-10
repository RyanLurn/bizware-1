import type { BetterAuthClientOptions } from "better-auth";

import { createAuthClient as createBetterAuthClient } from "better-auth/react";

export function createAuthClient({
  plugins,
}: {
  plugins?: BetterAuthClientOptions["plugins"];
}) {
  return createBetterAuthClient({ plugins });
}

export type AuthClient = ReturnType<typeof createAuthClient>;
