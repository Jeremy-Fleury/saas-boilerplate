import Tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import React from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import Path from "node:path";

// https://vite.dev/config/
// biome-ignore lint/style/noDefaultExport: Config export expected by Vite
export default defineConfig({
	plugins: [
		tanstackRouter({
			autoCodeSplitting: true,
			target: "react",
		}),
		React({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
		Tailwindcss(),
	],
	resolve: {
		alias: {
			"@": Path.resolve(__dirname, "./src"),
		},
	},
});
