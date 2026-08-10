import type { BetterFetchError } from "better-auth/react";

import type { createAuthClient } from "@/create";

export type AuthClient = ReturnType<typeof createAuthClient>;

export type AuthClientErrorCode = keyof AuthClient["$ERROR_CODES"];

export interface AuthClientError<Code extends AuthClientErrorCode> extends Pick<
  BetterFetchError,
  "message" | "status" | "statusText"
> {
  code: Code;
}
