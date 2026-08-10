import type { AuthBasePath, AuthBaseUrl } from "@repo/auth-core/schemas";
import type { BetterAuthClientOptions } from "better-auth";

import { createAuthClient as createBetterAuthClient } from "better-auth/react";

export function createAuthClient({
  baseURL,
  basePath,
  plugins,
}: {
  baseURL: AuthBaseUrl;
  basePath: AuthBasePath;
  plugins?: BetterAuthClientOptions["plugins"];
}) {
  return createBetterAuthClient({ baseURL, basePath, plugins });
}
