import type { AuthClientError } from "@repo/auth-client/types";

import { BaseError } from "@repo/error/classes/base";

import {
  PASSWORD_TOO_LONG_ERROR_MESSAGE,
  PASSWORD_TOO_SHORT_ERROR_MESSAGE,
} from "@/constants";

export class PasswordTooShortError extends BaseError<
  "PASSWORD_TOO_SHORT_ERROR",
  AuthClientError<"PASSWORD_TOO_SHORT">
> {
  readonly name = "PasswordTooShortError";
  readonly code = "PASSWORD_TOO_SHORT_ERROR";

  constructor({ cause }: { cause: AuthClientError<"PASSWORD_TOO_SHORT"> }) {
    super({
      message: PASSWORD_TOO_SHORT_ERROR_MESSAGE,
      cause,
    });
  }
}

export class PasswordTooLongError extends BaseError<
  "PASSWORD_TOO_LONG_ERROR",
  AuthClientError<"PASSWORD_TOO_LONG">
> {
  readonly name = "PasswordTooLongError";
  readonly code = "PASSWORD_TOO_LONG_ERROR";

  constructor({ cause }: { cause: AuthClientError<"PASSWORD_TOO_LONG"> }) {
    super({
      message: PASSWORD_TOO_LONG_ERROR_MESSAGE,
      cause,
    });
  }
}
