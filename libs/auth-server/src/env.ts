import { BaseAuthPathSchema, BaseAuthUrlSchema } from "@repo/auth-core/schemas";
import { z } from "zod";

import { CURRENT_AUTH_SECRET_VERSION } from "@/constants";

export const AuthServerEnvSchema = z.object({
  AUTH_BASE_URL: BaseAuthUrlSchema,
  AUTH_BASE_PATH: BaseAuthPathSchema,
  AUTH_SECRETS: z
    .templateLiteral([CURRENT_AUTH_SECRET_VERSION, ":", z.base64()])
    .transform((secretsString) => [
      {
        version: CURRENT_AUTH_SECRET_VERSION,
        value: secretsString.slice(2),
      },
    ]),
});

export type AuthServerEnv = z.infer<typeof AuthServerEnvSchema>;
