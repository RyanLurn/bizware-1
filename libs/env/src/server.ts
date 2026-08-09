import { z } from "zod";

export const ServerEnvSchema = z.object({
  HOST: z.hostname(),
  PORT: z.coerce.number().min(0).max(65535),
});
