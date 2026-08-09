import { WebServerEnvSchema } from "@repo/env/web-server";
import { createWebAppConfig } from "@repo/vite-config";

const env = WebServerEnvSchema.parse(process.env);

export default createWebAppConfig(env);
