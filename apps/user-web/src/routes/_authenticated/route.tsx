import { createFileRoute, Outlet } from "@tanstack/react-router";

import { getUserServerFn } from "@/lib/auth/server.functions";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    return await getUserServerFn();
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}
