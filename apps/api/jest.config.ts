import type { Config } from "jest";

const config: Config = {
	clearMocks: true,
	coverageProvider: "v8",
	moduleFileExtensions: ["ts", "js", "json"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	testEnvironment: "node",
	transform: {
		"^.+\\.ts$": [
			"@swc/jest",
			{
				jsc: {
					parser: { decorators: true, syntax: "typescript" },
					target: "es2023",
					transform: { decoratorMetadata: true },
				},
				module: { type: "es6" },
			},
		],
	},
};

// biome-ignore lint/style/noDefaultExport: biome default export
export default config;
