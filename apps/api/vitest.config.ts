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
			enabled: true,
			exclude: ["src/**/*.spec.ts", "src/**/*.test.ts", "**/*.d.ts", "dist/**", "src/common/domain/errors/**"],
			include: ["src/**/domain/**/*.ts", "src/**/application/**/*.ts"],
			provider: "v8",
			reporter: ["text"],
			reportsDirectory: "./coverage",
			thresholds: {
				branches: 100,
				functions: 100,
				lines: 100,
				statements: 100,
			},
		},
		environment: "node",
		globals: true,
	},
});
