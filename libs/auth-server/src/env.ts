import { z } from "zod";

import { CURRENT_AUTH_SECRET_VERSION } from "@/constants";

export const AuthServerEnvSchema = z.object({
  BETTER_AUTH_SECRETS: z.templateLiteral([
    CURRENT_AUTH_SECRET_VERSION,
    ":",
    z.base64(),
  ]),
  BETTER_AUTH_URL: z.url(),
});
