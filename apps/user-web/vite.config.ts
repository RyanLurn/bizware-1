import { WebServerEnvSchema } from "@repo/env/web-server";
import { createWebAppConfig } from "@repo/vite-config";

const env = WebServerEnvSchema.catch({
  HOST: "localhost",
  PORT: 5173,
}).parse(process.env);

export default createWebAppConfig(env);
