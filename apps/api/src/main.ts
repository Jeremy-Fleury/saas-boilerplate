import { ConsoleLogger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import type { INestApplication } from "@nestjs/common";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import type { OpenAPIObject } from "@nestjs/swagger";

import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { HttpExceptionFilter } from "@/app/infrastructure/filters/http-exception.filter";
import { AppModule } from "@/app/infrastructure/modules/app.module";
import { createValidationPipe } from "@/app/infrastructure/pipes/validation.pipe";

require("dd-trace").init({ logInjection: true });

function swaggerSetup(app: INestApplication): OpenAPIObject {
	const packageJson = JSON.parse(readFileSync(resolve(process.cwd(), "package.json"), "utf-8"));
	const config = new DocumentBuilder()
		.setTitle(packageJson.name)
		.setDescription(packageJson.description)
		.setVersion(packageJson.version)
		.build();
	const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup("api", app, document, {
		customSiteTitle: packageJson.name,
		raw: ["json"],
		ui: false,
	});

	const outputPath = join(process.cwd(), "openapi.json");
	writeFileSync(outputPath, JSON.stringify(document, null, 2), { encoding: "utf-8" });

	return document;
}

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

	const configService = app.get(ConfigService);

	const NODE_ENV = configService.get<string>("NODE_ENV");
	const PORT = configService.get<number>("PORT");
	const DEFAULT_PORT = 3000;

	app.useLogger(
		new ConsoleLogger({
			json: NODE_ENV !== "local",
			prefix: "NestJS Boilerplate",
			timestamp: true,
		}),
	);

	app.useGlobalPipes(createValidationPipe());
	app.useGlobalFilters(new HttpExceptionFilter());

	const document = swaggerSetup(app);

	app.use(
		"/docs",
		apiReference({
			content: document,
			withFastify: true,
		}),
	);

	await app.init();

	await app.listen(PORT ?? DEFAULT_PORT);
}

void bootstrap();
