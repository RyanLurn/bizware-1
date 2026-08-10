import { describe, expectTypeOf, test } from "vitest";

import type { createAppAuthServer } from "@/create";
import type { AuthSession, AuthUser } from "@/types";

type AppAuthServer = ReturnType<typeof createAppAuthServer>;

describe("createAuthServer and createAppAuthServer functions' returned values should infer the same", () => {
  test("session type", () => {
    type AppAuthSession = AppAuthServer["$Infer"]["Session"]["session"];
    expectTypeOf<AuthSession>().toMatchObjectType<AppAuthSession>();
  });
  test("user type", () => {
    type AppAuthUser = AppAuthServer["$Infer"]["Session"]["user"];
    expectTypeOf<AuthUser>().toMatchObjectType<AppAuthUser>();
  });
});
