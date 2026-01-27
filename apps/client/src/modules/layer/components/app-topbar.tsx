import type { JSX } from "react";

import { Avatar, AvatarFallback } from "@/shadcn/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/shadcn/components/ui/sidebar";

export function AppTopbar(): JSX.Element {
	return (
		<header className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-neutral-200 border-b bg-white px-6 py-4 md:flex-nowrap">
			<div className="flex min-w-0 items-center gap-3">
				<SidebarTrigger className="shrink-0" />
				<div className="min-w-0">
					<p className="text-neutral-400 text-xs uppercase tracking-[0.3em]">Workspace</p>
					<h2 className="truncate font-semibold text-lg">Acme Studio</h2>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button
							className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm"
							type="button"
						>
							<Avatar className="h-8 w-8">
								<AvatarFallback>JF</AvatarFallback>
							</Avatar>
							<span className="hidden sm:inline">Jeremy</span>
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>Profil</DropdownMenuItem>
						<DropdownMenuItem>Deconnexion</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
