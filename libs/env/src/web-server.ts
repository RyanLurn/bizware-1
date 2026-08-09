import { z } from "zod";

export const WebServerEnvSchema = z.object({
  HOST: z.hostname(),
  PORT: z.coerce.number().min(0).max(65535),
});

export type WebServerEnv = z.infer<typeof WebServerEnvSchema>;
