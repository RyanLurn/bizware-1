import { describe, expectTypeOf, test } from "vitest";

import type { AppAuthServer, AuthSession, AuthUser } from "@/types";

describe("AuthServer and AppAuthServer should infer the same", () => {
  test("session type", () => {
    type AppAuthSession = AppAuthServer["$Infer"]["Session"]["session"];
    expectTypeOf<AuthSession>().toMatchObjectType<AppAuthSession>();
  });
  test("user type", () => {
    type AppAuthUser = AppAuthServer["$Infer"]["Session"]["user"];
    expectTypeOf<AuthUser>().toMatchObjectType<AppAuthUser>();
  });
});
