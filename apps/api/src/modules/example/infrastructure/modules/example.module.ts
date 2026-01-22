import { Module } from "@nestjs/common";

import { DatabaseModule } from "@/common/database/infrastructure/modules/database.module";
import { UuidModule } from "@/common/id/infrastructure/modules/uuid.module";
import {
	EXAMPLE_CREATE_EXAMPLE_USE_CASE_PROVIDER,
	EXAMPLE_GET_EXAMPLE_USE_CASE_PROVIDER,
} from "@/modules/example/infrastructure/dependency-injection/example.provider";
import { ExampleController } from "@/modules/example/presentation/controllers/example.controller";

@Module({
	controllers: [ExampleController],
	exports: [],
	imports: [UuidModule, DatabaseModule],
	providers: [EXAMPLE_CREATE_EXAMPLE_USE_CASE_PROVIDER, EXAMPLE_GET_EXAMPLE_USE_CASE_PROVIDER],
})
export class ExampleModule {}
