import { z } from "zod";

import { DEFAULT_AUTH_BASE_PATH } from "@/constants";

export const AuthBaseUrlSchema = z.url();
export type AuthBaseUrl = z.infer<typeof AuthBaseUrlSchema>;

export const AuthBasePathSchema = z
  .templateLiteral(["/", z.string()])
  .default(DEFAULT_AUTH_BASE_PATH);
export type AuthBasePath = z.infer<typeof AuthBasePathSchema>;
