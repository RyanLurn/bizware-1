import type { ErrorObject } from "serialize-error";

export interface AppError<Code extends string> extends Error {
  code: Code;
}

export type FlatErrorObject<Code extends string> = Pick<
  AppError<Code>,
  "name" | "message" | "code"
>;

export type NestedErrorObject = ErrorObject;
