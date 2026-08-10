import type { AuthServer } from "@repo/auth-server/create";

import { err, ok } from "@repo/result/utils";

import { UnauthenticatedError } from "@/errors/unauthenticated";

export async function getUser({
  authServer,
  headers,
}: {
  authServer: AuthServer;
  headers: Headers;
}) {
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
}
