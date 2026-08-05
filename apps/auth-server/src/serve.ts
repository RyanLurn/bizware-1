import { serve } from "@hono/node-server";

import { env } from "@/config/env";
import { app } from "@/index";

const server = serve(
  {
    fetch: app.fetch,
    port: env.PORT,
    hostname: env.HOST,
  },
  (info) => {
    console.log(
      `Auth Server is running on http://${info.address}:${info.port}`,
    );
  },
);

process.on("SIGINT", () => {
  server.close();
  process.exit(0);
});
process.on("SIGTERM", () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
