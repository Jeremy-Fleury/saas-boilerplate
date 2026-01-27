import { createFileRoute } from "@tanstack/react-router";
import type { JSX } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/components/ui/card";

export const Route = createFileRoute("/app/")({
	component: AppHome,
});

function AppHome(): JSX.Element {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="font-semibold text-2xl">Dashboard</h1>
				<p className="mt-2 text-neutral-600 text-sm">
					Ceci est ton espace principal. On peut ajouter tes modules ici.
				</p>
			</div>
			<div className="grid gap-4 md:grid-cols-3">
				{[
					{ delta: "+12%", title: "MRR", value: "12,480 EUR" },
					{ delta: "+6%", title: "Nouveaux clients", value: "38" },
					{ delta: "-0.4%", title: "Churn", value: "1.8%" },
				].map((item) => (
					<Card key={item.title}>
						<CardHeader>
							<CardTitle className="text-neutral-500 text-sm">{item.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="font-semibold text-2xl text-neutral-900">{item.value}</p>
							<p className="mt-2 text-emerald-600 text-xs">{item.delta}</p>
						</CardContent>
					</Card>
				))}
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Activité récente</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-neutral-600 text-sm">
					<div className="flex items-center justify-between">
						<span>Nouvel abonnement Pro</span>
						<span>il y a 2h</span>
					</div>
					<div className="flex items-center justify-between">
						<span>Facture envoyée</span>
						<span>il y a 5h</span>
					</div>
					<div className="flex items-center justify-between">
						<span>Equipe invitee</span>
						<span>hier</span>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
