import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDom from "react-dom/client";
import "./styles/index.css";

import { setApiBaseUrl } from "@org/api-client/http/custom-instance";

import { routeTree } from "./routeTree.gen";

setApiBaseUrl(import.meta.env.VITE_API_URL);

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const queryClient = new QueryClient();

const router = createRouter({
	defaultNotFoundComponent: () => <div>Not Found2s</div>,
	defaultPreload: "intent",
	routeTree,
	scrollRestoration: true,
});

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
