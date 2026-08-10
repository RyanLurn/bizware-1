import type { AuthClient } from "@repo/auth-client/types";

import { UnexpectedError } from "@repo/error/classes/unexpected";
import { err, ok } from "@repo/result/utils";

export async function signUp(
  authClient: AuthClient,
  {
    name,
    email,
    password,
    callbackURL,
  }: {
    name: string;
    email: string;
    password: string;
    callbackURL: string;
  },
) {
  try {
    const { data } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL,
    });

    if (data) {
      return ok(data);
    }
  } catch (error) {
    return err(
      new UnexpectedError({
        failedTo: "sign up",
        cause: error,
      }),
    );
  }
}
