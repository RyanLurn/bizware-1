import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "@repo/auth-core/constants";

export const PASSWORD_TOO_SHORT_ERROR_MESSAGE = `Password must have at least ${MIN_PASSWORD_LENGTH} characters.`;

export const PASSWORD_TOO_LONG_ERROR_MESSAGE = `Password can't have more than ${MAX_PASSWORD_LENGTH} characters.`;
