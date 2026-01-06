import { defineConfig } from "orval";

// biome-ignore lint/style/noDefaultExport: Config export expected by Orval
export default defineConfig({
	"api-file": {
		input: {
			target: "./openapi.json",
		},
		output: {
			client: "react-query",
			indexFiles: true,
			mock: false,
			mode: "split",
			schemas: "../../packages/api-client/src/model",
			target: "../../packages/api-client/src/api.ts",
		},
	},
});
