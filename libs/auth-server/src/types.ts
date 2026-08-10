import type { createAuthServer } from "@/create";

export type AuthServer = ReturnType<typeof createAuthServer>;

export type AuthSession = AuthServer["$Infer"]["Session"]["session"];
export type AuthUser = AuthServer["$Infer"]["Session"]["user"];
