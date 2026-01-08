import { defineConfig } from "orval";

// biome-ignore lint/style/noDefaultExport: Config export expected by Orval
export default defineConfig({
	"api-file": {
		input: {
			target: "../../apps/api/openapi.json",
		},
		output: {
			client: "react-query",
			indexFiles: true,
			mock: false,
			mode: "split",
			schemas: "./src/model",
			target: "./src/api.ts",
		},
	},
});
