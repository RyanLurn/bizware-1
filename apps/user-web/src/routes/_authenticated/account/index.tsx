import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/account/")({
  component: AccountPage,
});

function AccountPage() {
  const { user } = Route.useRouteContext();
  return (
    <div className="typeset">
      Hello, {user.name}! Welcome to the Account page.
    </div>
  );
}
