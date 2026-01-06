import React from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
// biome-ignore lint/style/noDefaultExport: Config export expected by Vite
export default defineConfig({
	plugins: [
		React({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
	],
});
