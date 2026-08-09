import { z } from "zod";

export const NodeEnv = z.object({
  NODE_ENV: z.enum(["development", "testing", "staging", "production"]),
});
