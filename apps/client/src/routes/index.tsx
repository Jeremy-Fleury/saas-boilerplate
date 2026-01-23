import { exampleControllerCreateExample } from "@org/api-client";
import { createFileRoute } from "@tanstack/react-router";
import type { JSX } from "react";

import { Button } from "@/shadcn/components/ui/button";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent(): JSX.Element {
	const onClick = async () => {
		await exampleControllerCreateExample({
			companyId: "019ae9a2-fb25-78a0-8b39-de00ab262777",
			description: "Test",
			name: "Test",
		});
	};

	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
			<Button onClick={onClick}>Create Example</Button>
		</div>
	);
}
