import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "@/app/controllers/app.controller";
import { envValidate } from "@/app/env/env.validation";
import { ExampleModule } from "@/example/presentation/modules/example.module";

@Module({
	controllers: [AppController],
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validate: envValidate,
		}),
		ExampleModule,
	],
	providers: [],
})
export class AppModule {}
