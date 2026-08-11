import { AuthServerEnvSchema } from "@repo/auth-server/env";
import { DbEnvSchema } from "@repo/db/env";
import { NodeEnvSchema } from "@repo/env/node";
import { WebServerEnvSchema } from "@repo/env/web-server";
import { z } from "zod";

export const ServerEnvSchema = z.object({
  ...NodeEnvSchema.shape,
  ...WebServerEnvSchema.shape,
  ...DbEnvSchema.shape,
  ...AuthServerEnvSchema.shape,
});
export type ServerEnv = z.infer<typeof ServerEnvSchema>;
