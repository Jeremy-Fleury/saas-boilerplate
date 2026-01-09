import { tanstackRouter } from "@tanstack/router-plugin/vite";
import React from "@vitejs/plugin-react";
import { defineConfig } from "vite";

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
	],
});
