import type { AuthServer, AuthUser } from "@repo/auth-server/types";
import type { Result } from "@repo/result/types";

import { UnexpectedError } from "@repo/error/classes/unexpected";
import { err, ok } from "@repo/result/utils";

import { UnauthenticatedError } from "@/errors";

export async function getUser({
  authServer,
  headers,
}: {
  authServer: AuthServer;
  headers: Headers;
}): Promise<Result<AuthUser, UnauthenticatedError | UnexpectedError>> {
  try {
    const getSessionResult = await authServer.api.getSession({
      headers,
    });

    if (getSessionResult === null) {
      return err(
        new UnauthenticatedError({
          message: "You are unauthenticated. Please sign in to continue.",
          cause: "getSession returns null",
        }),
      );
    }

    return ok(getSessionResult.user);
  } catch (error) {
    return err(
      new UnexpectedError({
        failedTo: "get your information",
        cause: error,
      }),
    );
  }
}
