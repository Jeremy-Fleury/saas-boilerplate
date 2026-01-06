import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Axios from "axios";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";

import { App } from "./app/App.tsx";

const root: HTMLElement | null = document.getElementById("root");

if (!root) {
	throw new Error("Root element not found");
}

Axios.defaults.baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const queryClient: QueryClient = new QueryClient();

createRoot(root).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</StrictMode>,
);
