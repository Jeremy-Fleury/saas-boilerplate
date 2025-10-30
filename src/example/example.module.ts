import { Module } from "@nestjs/common";

import { CreateExampleUseCase } from "@/example/application/use-cases/create-example.use-case";
import { GetExampleUseCase } from "@/example/application/use-cases/get-example.use-case";
import { ExampleRepository } from "@/example/infrastructure/repositories/example.repository";
import { ExampleController } from "@/example/presentation/controllers/example.controller";

@Module({
	controllers: [ExampleController],
	imports: [],
	providers: [CreateExampleUseCase, ExampleRepository, GetExampleUseCase],
})
export class ExampleModule {}
