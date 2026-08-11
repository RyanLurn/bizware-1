import { createFileRoute, Outlet } from "@tanstack/react-router";

import { getAuthInfoServerFn } from "@/lib/auth/server.functions";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    return await getAuthInfoServerFn();
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}
