import { createFileRoute, Outlet } from "@tanstack/react-router";
import type { JSX } from "react";

import { AppSidebar } from "@/modules/layer/components/app-sidebar";
import { AppTopbar } from "@/modules/layer/components/app-topbar";
import { SidebarInset, SidebarProvider } from "@/shadcn/components/ui/sidebar";

export const Route = createFileRoute("/app")({
	component: AppLayout,
});

function AppLayout(): JSX.Element {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<AppTopbar />
				<main className="flex-1 px-6 py-8">
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
