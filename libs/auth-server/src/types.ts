import type { createAuthServer } from "@/create";
import type { createAppAuthServer } from "@/create";

export type AuthServer = ReturnType<typeof createAuthServer>;
export type AppAuthServer = ReturnType<typeof createAppAuthServer>;

export type AuthSession = AuthServer["$Infer"]["Session"]["session"];
export type AuthUser = AuthServer["$Infer"]["Session"]["user"];
