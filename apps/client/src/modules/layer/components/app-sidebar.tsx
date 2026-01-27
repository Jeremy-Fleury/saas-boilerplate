import { Link, useRouterState } from "@tanstack/react-router";
import type { JSX } from "react";

import { navItems } from "@/modules/layer/navigation";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarSeparator,
} from "@/shadcn/components/ui/sidebar";

export function AppSidebar(): JSX.Element {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	return (
		<Sidebar collapsible="icon">
			<SidebarSeparator />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{navItems.map((item) => {
								const isActive =
									item.to === "/app"
										? pathname === "/app" || pathname === "/app/"
										: pathname.startsWith(item.to);
								const Icon = item.icon;

								return (
									<SidebarMenuItem key={item.to}>
										<SidebarMenuButton asChild isActive={isActive}>
											<Link to={item.to}>
												<Icon />
												<span>{item.label}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
