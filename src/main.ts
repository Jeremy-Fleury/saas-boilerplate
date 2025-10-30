import { ConsoleLogger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import type { INestApplication } from "@nestjs/common";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import type { OpenAPIObject } from "@nestjs/swagger";

import { AppModule } from "@/app/app.module";

function swaggerSetup(app: INestApplication): void {
	const config = new DocumentBuilder().setTitle("Blank OpenBanking API").setVersion("1.0").build();
	const documentFactory = (): OpenAPIObject => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, documentFactory);
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
		}),
	);

	app.useGlobalPipes(new ValidationPipe());

	swaggerSetup(app);

	await app.init();

	await app.listen(PORT ?? DEFAULT_PORT);
}

void bootstrap();
