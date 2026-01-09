import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { JSX } from "react";

import { Button } from "@/shadcn/components/ui/button";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent(): JSX.Element {
	return (
		<>
			<div className="p-2 flex gap-2 text-lg">
				<Button asChild>
					<Link to="/">Home</Link>
				</Button>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}
