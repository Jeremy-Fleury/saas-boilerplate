import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { JSX } from "react";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent(): JSX.Element {
	return (
		<>
			<Outlet />
			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}
