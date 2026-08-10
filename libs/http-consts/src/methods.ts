import type { ValueOf } from "@repo/types";

export const HTTP_METHOD_RECORD = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
  PATCH: "PATCH",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
  TRACE: "TRACE",
  CONNECT: "CONNECT",
} as const;

export type HttpMethod = ValueOf<typeof HTTP_METHOD_RECORD>;
