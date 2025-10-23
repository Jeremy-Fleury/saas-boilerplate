import { Module } from "@nestjs/common";

import { ExampleController } from "@/example/controllers/example.controller";
import { ExampleRepository } from "@/example/repositories/example.repository";
import { CreateExampleUseCase } from "@/example/use-cases/create-example.use-case";
import { GetExampleUseCase } from "@/example/use-cases/get-example.use-case";

@Module({
	controllers: [ExampleController],
	imports: [],
	providers: [CreateExampleUseCase, ExampleRepository, GetExampleUseCase],
})
export class ExampleModule {}
