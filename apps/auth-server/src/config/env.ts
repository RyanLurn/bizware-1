import { DbEnvSchema } from "@repo/db/env";
import { z } from "zod";

export const EnvSchema = z.object({
  ...DbEnvSchema.shape,
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.url(),
});

export const env = EnvSchema.parse(process.env);
