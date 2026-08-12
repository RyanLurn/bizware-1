import { defineConfig } from "drizzle-kit";

process.loadEnvFile();

export default defineConfig({
  out: "./migrations",
  schema: "./src",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DIRECT_CONNECTION_STRING!,
  },
});
