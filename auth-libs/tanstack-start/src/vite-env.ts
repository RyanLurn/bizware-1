import { AuthBasePathSchema, AuthBaseUrlSchema } from "@repo/auth-core/schemas";
import { z } from "zod";

export const AuthViteEnvSchema = z.object({
  VITE_AUTH_BASE_URL: AuthBaseUrlSchema,
  VITE_AUTH_BASE_PATH: AuthBasePathSchema,
});
