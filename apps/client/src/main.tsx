import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import Axios from "axios";
import { StrictMode } from "react";
import ReactDom from "react-dom/client";
import "./styles/index.css";

import { routeTree } from "./routeTree.gen";

Axios.defaults.baseURL = import.meta.env.API_URL;

const queryClient = new QueryClient();

const router = createRouter({
	defaultNotFoundComponent: () => <div>Not Found2s</div>,
	defaultPreload: "intent",
	routeTree,
	scrollRestoration: true,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element not found");
}

if (!rootElement.innerHTML) {
	const root = ReactDom.createRoot(rootElement);
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</StrictMode>,
	);
}
