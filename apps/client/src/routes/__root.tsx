import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { JSX } from "react";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent(): JSX.Element {
	return (
		<>
			<div className="p-2 flex gap-2 text-lg">
				<Link
					activeOptions={{ exact: true }}
					activeProps={{
						className: "font-bold",
					}}
					to="/"
				>
					Home
				</Link>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}
