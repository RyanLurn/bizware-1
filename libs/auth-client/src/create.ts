import type { AuthBasePath, AuthBaseUrl } from "@repo/auth-core/schemas";

import { createAuthClient as createBetterAuthClient } from "better-auth/react";

export function createAuthClient({
  baseURL,
  basePath,
}: {
  baseURL: AuthBaseUrl;
  basePath: AuthBasePath;
}) {
  return createBetterAuthClient({ baseURL, basePath });
}
