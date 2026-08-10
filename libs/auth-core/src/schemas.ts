import { z } from "zod";

import { DEFAULT_BASE_AUTH_PATH } from "@/constants";

export const BaseAuthUrlSchema = z.url();
export type BaseAuthUrl = z.infer<typeof BaseAuthUrlSchema>;

export const BaseAuthPathSchema = z
  .templateLiteral(["/", z.string()])
  .default(DEFAULT_BASE_AUTH_PATH);
export type BaseAuthPath = z.infer<typeof BaseAuthPathSchema>;
