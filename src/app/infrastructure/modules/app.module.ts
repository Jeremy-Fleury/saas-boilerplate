import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import type { MiddlewareConsumer, NestModule } from "@nestjs/common";

import { RequestLoggerMiddleware } from "@/app/infrastructure/middlewares/request-logger.middleware";
import { envValidationService } from "@/app/infrastructure/services/env.service";
import { AppController } from "@/app/presentation/controllers/app.controller";
import { DatabaseModule } from "@/common/database/infrastructure/modules/database.module";
import { ExampleModule } from "@/modules/example/infrastructure/modules/example.module";

@Module({
	controllers: [AppController],
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validate: envValidationService,
		}),
		ExampleModule,
		DatabaseModule,
	],
})
export class AppModule implements NestModule {
	public configure(consumer: MiddlewareConsumer): void {
		consumer.apply(RequestLoggerMiddleware).forRoutes("*");
	}
}
