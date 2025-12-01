import { Module } from "@nestjs/common";

import { DatabaseModule } from "@/common/database/infrastructure/modules/database.module";
import { UuidModule } from "@/common/uuid/infrastructure/modules/uuid.module";

import { ExampleController } from "../../presentation/controllers/example.controller";
import {
	EXAMPLE_CREATE_EXAMPLE_USE_CASE_PROVIDER,
	EXAMPLE_GET_EXAMPLE_USE_CASE_PROVIDER,
	EXAMPLE_REPOSITORY_PROVIDER,
} from "../dependency-injection/example.provider";

@Module({
	controllers: [ExampleController],
	exports: [],
	imports: [UuidModule, DatabaseModule],
	providers: [EXAMPLE_REPOSITORY_PROVIDER, EXAMPLE_CREATE_EXAMPLE_USE_CASE_PROVIDER, EXAMPLE_GET_EXAMPLE_USE_CASE_PROVIDER],
})
export class ExampleModule {}
