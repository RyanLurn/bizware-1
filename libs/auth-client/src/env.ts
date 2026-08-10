import { AuthBaseUrlSchema, AuthBasePathSchema } from "@repo/auth-core/schemas";
import { z } from "zod";

export const AuthClientEnvSchema = z.object({
  VITE_AUTH_BASE_URL: AuthBaseUrlSchema,
  VITE_AUTH_BASE_PATH: AuthBasePathSchema,
});
export type AuthServerEnv = z.infer<typeof AuthClientEnvSchema>;
