import { createFileRoute, Link } from "@tanstack/react-router";
import type { JSX } from "react";

import { Button } from "@/shadcn/components/ui/button";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent(): JSX.Element {
	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neutral-50 via-white to-neutral-100">
			<div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-16">
				<div className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-4 py-2 font-medium text-neutral-500 text-xs uppercase tracking-[0.2em]">
					<span className="h-2 w-2 rounded-full bg-emerald-500" />
					Ready for launch
				</div>
				<h1 className="mt-6 font-semibold text-4xl text-neutral-900 leading-tight sm:text-5xl">
					Construis ton SaaS en quelques minutes.
				</h1>
				<p className="mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg">
					Une base propre avec une home claire et un espace app structure avec sidebar et top bar. Commence
					ici puis itère sur les modules.
				</p>
				<div className="mt-8 flex flex-wrap items-center gap-4">
					<Button asChild>
						<Link to="/app">Entrer dans l'app</Link>
					</Button>
					<Button asChild variant="outline">
						<Link to="/app">Voir le layout SaaS</Link>
					</Button>
				</div>
				<div className="mt-12 grid gap-4 sm:grid-cols-3">
					{[
						{
							description: "Sidebar et top bar déjà en place pour tes modules.",
							title: "Navigation claire",
						},
						{
							description: "Zone de contenu large pour dashboards et ecrans.",
							title: "Espace principal",
						},
						{
							description: "Composants shadcn prets pour des iterations rapides.",
							title: "Shadcn ready",
						},
					].map((item) => (
						<div
							className="rounded-2xl border border-neutral-200 bg-white/80 p-5 shadow-sm"
							key={item.title}
						>
							<h3 className="font-semibold text-base text-neutral-900">{item.title}</h3>
							<p className="mt-2 text-neutral-600 text-sm">{item.description}</p>
						</div>
					))}
				</div>
				<div className="mt-16 text-neutral-500 text-sm">Base layer: /app/**</div>
			</div>
		</div>
	);
}
