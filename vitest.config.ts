import { defineConfig } from "vitest/config";

import { resolve } from "node:path";

const rootDir: string = resolve(process.cwd(), "src");

// biome-ignore lint/style/noDefaultExport: Config export attendu par Vitest
export default defineConfig({
	resolve: {
		alias: {
			"@": rootDir,
		},
	},
	test: {
		clearMocks: true,
		coverage: {
			provider: "v8",
		},
		environment: "node",
		globals: true,
	},
});
