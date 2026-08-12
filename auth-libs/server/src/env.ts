import { AuthBaseUrlSchema, AuthBasePathSchema } from "@repo/auth-core/schemas";
import { z } from "zod";

import { CURRENT_AUTH_SECRET_VERSION } from "@/constants";

export const AuthSecretsSchema = z
  .templateLiteral([CURRENT_AUTH_SECRET_VERSION, ":", z.string().min(32)])
  .transform((secretsString) => [
    {
      version: CURRENT_AUTH_SECRET_VERSION,
      value: secretsString.slice(2),
    },
  ]);
export type AuthSecrets = z.infer<typeof AuthSecretsSchema>;

export const AuthServerEnvSchema = z.object({
  AUTH_BASE_URL: AuthBaseUrlSchema,
  AUTH_BASE_PATH: AuthBasePathSchema,
  AUTH_SECRETS: AuthSecretsSchema,
});

export type AuthServerEnv = z.infer<typeof AuthServerEnvSchema>;
