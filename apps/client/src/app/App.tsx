import { useAppControllerHealth } from "@org/api-client";
import type { JSX } from "react";

export function App(): JSX.Element {
	const { data, isLoading, error } = useAppControllerHealth();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!data) {
		return <div>No data</div>;
	}

	return <div>{data.data.status}</div>;
}
