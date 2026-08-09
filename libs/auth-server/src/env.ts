import { z } from "zod";

import { CURRENT_AUTH_SECRET_VERSION } from "@/constants";

export const AuthServerEnvSchema = z.object({
  BETTER_AUTH_SECRETS: z
    .templateLiteral([CURRENT_AUTH_SECRET_VERSION, ":", z.base64()])
    .transform((secretsString) => [
      {
        version: CURRENT_AUTH_SECRET_VERSION,
        value: secretsString.slice(2),
      },
    ]),
  BETTER_AUTH_URL: z.url(),
  BETTER_AUTH_PATH: z.templateLiteral(["/", z.string()]).default("/api/auth"),
});

export type AuthServerEnv = z.infer<typeof AuthServerEnvSchema>;
