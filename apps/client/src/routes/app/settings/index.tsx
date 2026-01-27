import { createFileRoute } from "@tanstack/react-router";
import type { JSX } from "react";

export const Route = createFileRoute("/app/settings/")({
	component: SettingsPage,
});

function SettingsPage(): JSX.Element {
	return (
		<div className="space-y-3">
			<h1 className="font-semibold text-2xl">Settings</h1>
			<p className="text-neutral-600 text-sm">Paramètres du workspace et de l'équipe.</p>
		</div>
	);
}
